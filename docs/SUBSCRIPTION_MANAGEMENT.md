# Zarządzanie subskrypcjami i okresami próbnymi

## Spis treści

1. [Model subskrypcji](#model-subskrypcji)
2. [Matryca funkcji planów](#matryca-funkcji-planów)
3. [Typy okresów próbnych](#typy-okresów-próbnych)
4. [Cykl życia triala](#cykl-życia-triala)
5. [Automatyczne przedłużenie](#automatyczne-przedłużenie)
6. [Zachowanie przy downgrade](#zachowanie-przy-downgrade)
7. [Feature gating](#feature-gating)
8. [Banner informacyjny triala](#banner-informacyjny-triala)
9. [Powiadomienia email](#powiadomienia-email)
10. [Zadania Celery](#zadania-celery)
11. [Architektura billing-ready](#architektura-billing-ready)
12. [Obsługa firm pilotażowych](#obsługa-firm-pilotażowych)
13. [Śledzenie użycia](#śledzenie-użycia)

---

## Model subskrypcji

```python
class Subscription(models.Model):
    company = models.OneToOneField(Company, on_delete=models.CASCADE)

    plan = models.CharField(max_length=20, choices=[
        ('free', 'Free'),
        ('starter', 'Starter'),
        ('professional', 'Professional'),
        ('enterprise', 'Enterprise'),
    ])

    status = models.CharField(max_length=20, choices=[
        ('trial', 'Okres próbny'),
        ('pilot', 'Pilot'),
        ('af_trial', 'Trial biura rachunkowego'),
        ('af_client_trial', 'Trial klienta BR'),
        ('active', 'Aktywna'),
        ('expired', 'Wygasła'),
        ('cancelled', 'Anulowana'),
    ])

    trial_type = models.CharField(max_length=20, null=True, choices=[
        ('reverse_trial', 'Reverse trial'),
        ('pilot', 'Pilot'),
        ('af_trial', 'Trial BR'),
        ('af_client', 'Trial klienta BR'),
    ])

    valid_until = models.DateTimeField()
    trial_extended = models.BooleanField(default=False)
    features = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

---

## Matryca funkcji planów

| Funkcja                  | Free  | Starter | Professional | Enterprise |
|--------------------------|-------|---------|--------------|------------|
| `gps_tracking`           | -     | +       | +            | +          |
| `pdf_reports`            | -     | +       | +            | +          |
| `fleet_cost_reports`     | -     | -       | +            | +          |
| `delegation_reports`     | -     | -       | +            | +          |
| `fk_export`              | -     | -       | +            | +          |
| `realtime_map`           | -     | -       | +            | +          |
| `multi_tenant`           | -     | -       | -            | +          |
| `push_notifications`     | -     | +       | +            | +          |
| `api_access`             | -     | -       | -            | +          |
| **max_vehicles**         | 1     | 5       | 50           | bez limitu |
| **max_drivers**          | 1     | 5       | 50           | bez limitu |

**Legenda:** `+` = dostępne, `-` = niedostępne

---

## Typy okresów próbnych

### reverse_trial (14 dni)

- **Dla kogo:** nowe firmy rejestrujące się samodzielnie
- **Plan w trakcie triala:** Professional
- **Czas trwania:** 14 dni
- **Po wygaśnięciu:** automatyczny downgrade do planu Free
- **Cel:** użytkownik poznaje pełne możliwości, a po 14 dniach decyduje o zakupie

### pilot (6 miesięcy)

- **Dla kogo:** firmy pilotażowe (zaproszenia, early adopters)
- **Plan w trakcie triala:** Professional
- **Czas trwania:** 6 miesięcy
- **Po wygaśnięciu:** brak automatycznego downgrade — obsługa ręczna (kontakt osobisty)
- **Cel:** długotrwałe testowanie, zbieranie feedbacku, budowanie relacji

### af_trial (3 miesiące)

- **Dla kogo:** biura rachunkowe (accounting firms)
- **Plan w trakcie triala:** Enterprise
- **Czas trwania:** 3 miesiące
- **Brak wymogu minimalnej liczby klientów** — BR podłącza klientów w swoim tempie
- **Po wygaśnięciu:** grace period (dodatkowe 14 dni), potem downgrade do planu Free (1 klient)
- **Cel:** biuro testuje integrację z klientami, im więcej podłączy tym silniejszy efekt loss aversion przy downgrade

### Model subskrypcji biura rachunkowego

| Funkcja | **Free** | **Enterprise** |
|---------|----------|----------------|
| Cena | 0 zł | 149 zł/mies. (roczna: 127 zł) |
| Widoczność klientów | wszyscy (read-only) | wszyscy (pełny dostęp) |
| Przeglądanie tras/pojazdów | tak | tak |
| Przełączanie firm | tak (read-only) | tak (pełny dostęp) |
| Generowanie nowych raportów PDF | **nie** (paywall) | tak |
| Eksport FK (EDI++) | **nie** (paywall) | tak |
| Dashboard zbiorczy | **nie** | tak |
| White-label | nie | tak (post-MVP) |

Kluczowe: BR na planie Free **widzi dane wszystkich klientów**, ale nie może generować raportów ani eksportować do FK. Każde kliknięcie "Generuj raport" wyświetla paywall z propozycją upgrade do Enterprise.

Efekt: klienci BR nadal wysyłają dane do systemu, BR widzi je w panelu, ale musi ręcznie przepisywać zamiast kliknąć "Eksportuj" → silna motywacja do upgrade.

Uwaga: subskrypcja BR jest niezależna od subskrypcji klientów BR. Każda firma transportowa płaci za siebie (Starter/Professional/Enterprise per pojazd).

### af_client_trial (3 miesiące)

- **Dla kogo:** klienci biur rachunkowych (zaproszeni przez BR)
- **Plan w trakcie triala:** Professional
- **Czas trwania:** 3 miesiące
- **Po wygaśnięciu:** automatyczny downgrade do planu Free
- **Cel:** klient BR korzysta z systemu bez konieczności własnej rejestracji

---

## Cykl życia triala

Diagram przedstawia pełny cykl życia triala typu `reverse_trial`:

```
  Rejestracja firmy
        |
        v
  +-------------------------------------+
  | Subscription                        |
  | plan: professional                  |
  | status: trial                       |
  | trial_type: reverse_trial           |
  | valid_until: +14 dni                |
  +-------------------------------------+
        |
        |  [Codzienne sprawdzanie]
        v
  +------------------+
  | Przypomnienia    |     Dzień przed wygaśnięciem:
  | email:           |     +-----------+
  | 30d -> (skip)    |     | Banner:   |
  | 14d -> wyslij    |     | danger    |
  | 7d  -> wyslij    |     +-----------+
  | 3d  -> wyslij    |
  | 1d  -> wyslij    |
  +------------------+
        |
        v  [valid_until osiągnięty]
  +-------------------------------------+
  | Automatyczny downgrade              |
  | plan: free                          |
  | status: expired                     |
  | features: FREE_FEATURES             |
  | max_vehicles: 1                     |
  | max_drivers: 1                      |
  +-------------------------------------+
        |
        |  [+7 dni po wygaśnięciu]
        v
  +-------------------------------------+
  | Email follow-up                     |
  | "Wróć do Professional!"            |
  | Kod rabatowy / oferta specjalna     |
  +-------------------------------------+
        |
        v
  +-------------------+    +--------------------+
  | Win-back:         |    | Pozostaje na Free: |
  | Użytkownik płaci  |    | ograniczone        |
  | → status: active  |    | funkcje            |
  +-------------------+    +--------------------+
```

---

## Automatyczne przedłużenie

Mechanizm dla użytkowników, którzy nie mieli okazji przetestować systemu:

- **Warunek:** użytkownik ma 0 przejazdów w okresie triala
- **Akcja:** automatyczne przedłużenie o **+7 dni**
- **Limit:** jednorazowe (flaga `trial_extended=True`)
- **Cel:** dać szansę użytkownikom, którzy zarejestrowali się, ale nie zdążyli wdrożyć

```python
def check_auto_extend(subscription: Subscription) -> bool:
    if subscription.trial_extended:
        return False  # już przedłużano

    trips_count = Trip.objects.filter(
        company=subscription.company,
        created_at__gte=subscription.created_at
    ).count()

    if trips_count == 0:
        subscription.valid_until += timedelta(days=7)
        subscription.trial_extended = True
        subscription.save()
        return True

    return False
```

---

## Zachowanie przy downgrade

Przy automatycznym downgrade z planu płatnego/trial na Free:

### Co się zmienia

- `plan` → `free`
- `features` → `FREE_FEATURES` (pusta lista funkcji)
- `max_vehicles` → 1
- `max_drivers` → 1

### Co NIE jest usuwane

- **Pojazdy i kierowcy** — zachowane w bazie. Ponad limit = tryb tylko do odczytu
- **Historyczne przejazdy** — pełna historia zachowana, dostępna do przeglądania
- **Wygenerowane raporty** — wcześniej wygenerowane PDF-y nadal dostępne do pobrania
- **Dane firmowe** — profil, ustawienia, konfiguracja — bez zmian

### Co jest blokowane

- Generowanie nowych raportów PDF → paywall ("Odblokuj w planie Starter")
- Eksport do systemów FK → paywall ("Odblokuj w planie Professional")
- Śledzenie GPS w czasie rzeczywistym → niedostępne
- Mapa w czasie rzeczywistym → niedostępne
- Push notifications → zastąpione powiadomieniami email
- Dodawanie pojazdów/kierowców ponad limit → komunikat o limicie

---

## Feature gating

### FeatureGateMiddleware

Middleware przygotowany, ale **wyłączony do czasu uruchomienia billingu** (Sprint 7+):

```python
class FeatureGateMiddleware:
    """
    Middleware sprawdzający dostęp do funkcji na podstawie planu.
    WYŁĄCZONY — aktywacja po uruchomieniu Stripe.
    """

    ENDPOINT_FEATURE_MAP = {
        '/api/v1/reports/pdf/': 'pdf_reports',
        '/api/v1/reports/fleet-cost/': 'fleet_cost_reports',
        '/api/v1/reports/delegation/': 'delegation_reports',
        '/api/v1/export/': 'fk_export',
        '/api/v1/tracking/realtime/': 'realtime_map',
        '/api/v1/tracking/gps/': 'gps_tracking',
    }

    def __call__(self, request):
        feature = self._match_endpoint(request.path)
        if feature and not self._has_feature(request.user, feature):
            return JsonResponse({
                'error': 'feature_not_available',
                'required_plan': self._get_required_plan(feature),
                'upgrade_url': '/billing/upgrade/',
                'message': f'Ta funkcja wymaga planu {self._get_required_plan(feature)}.'
            }, status=403)
        return self.get_response(request)
```

### Odpowiedź 403

```json
{
    "error": "feature_not_available",
    "required_plan": "professional",
    "upgrade_url": "/billing/upgrade/",
    "message": "Ta funkcja wymaga planu Professional."
}
```

---

## Banner informacyjny triala

Banner wyświetlany w interfejsie użytkownika, informujący o pozostałym czasie triala:

| Pozostałe dni | Typ bannera | Kolor    | Komunikat                                      |
|---------------|-------------|----------|-------------------------------------------------|
| > 10 dni      | `info`      | niebieski | "Korzystasz z wersji próbnej Professional (X dni)" |
| 3–10 dni      | `warning`   | żółty    | "Twoja wersja próbna wygasa za X dni"           |
| 1–2 dni       | `danger`    | czerwony | "Twoja wersja próbna wygasa jutro/pojutrze!"    |
| 0 (wygasł)    | `expired`   | szary    | "Korzystasz z darmowego planu Free"             |

### Endpoint

```
GET /api/v1/billing/trial-status/

Response:
{
    "plan": "professional",
    "status": "trial",
    "days_remaining": 5,
    "valid_until": "2026-04-20T23:59:59Z",
    "banner_type": "warning",
    "banner_message": "Twoja wersja próbna wygasa za 5 dni",
    "upgrade_url": "/billing/upgrade/"
}
```

---

## Powiadomienia email

### Model TrialEmailLog

Zapobiega wielokrotnemu wysyłaniu tego samego emaila:

```python
class TrialEmailLog(models.Model):
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)
    email_type = models.CharField(max_length=30)  # np. 'reminder_7d'
    sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['subscription', 'email_type']
```

### Szablony powiadomień

| Typ email         | Kiedy wysyłany        | Treść                                           |
|-------------------|-----------------------|-------------------------------------------------|
| `reminder_30d`    | 30 dni przed końcem   | (tylko dla pilotów/af_trial z dłuższym okresem) |
| `reminder_14d`    | 14 dni przed końcem   | "Pozostało 14 dni wersji próbnej"               |
| `reminder_7d`     | 7 dni przed końcem    | "Pozostał tydzień — oto co osiągnąłeś"          |
| `reminder_3d`     | 3 dni przed końcem    | "Za 3 dni stracisz dostęp do..."                |
| `reminder_1d`     | 1 dzień przed końcem  | "Jutro wygasa Twoja wersja próbna!"             |
| `expired`         | w dniu wygaśnięcia    | "Twoja wersja próbna wygasła"                   |
| `followup_7d`     | 7 dni po wygaśnięciu  | "Wróć do Professional — specjalna oferta"       |

### Personalizacja

Każdy email zawiera dane o wykorzystaniu systemu:

```python
context = {
    'company_name': subscription.company.name,
    'plan_name': subscription.plan,
    'days_remaining': days_remaining,
    'trips_count': usage.trips_count,          # "Wykonałeś 47 przejazdów"
    'distance_km': usage.total_distance_km,    # "Przejechałeś 2 340 km"
    'reports_count': usage.reports_generated,   # "Wygenerowałeś 12 raportów"
    'upgrade_url': upgrade_url,
}
```

---

## Zadania Celery

### check_expiring_subscriptions

- **Harmonogram:** codziennie o 7:00
- **Zadanie:** sprawdza subskrypcje zbliżające się do wygaśnięcia
- **Akcje:**
  - Wysyła przypomnienia email (wg progów: 14d, 7d, 3d, 1d)
  - Przeprowadza downgrade wygasłych subskrypcji
  - Sprawdza warunek auto-extend (0 przejazdów → +7 dni)
  - Wysyła email follow-up (7 dni po wygaśnięciu)

```python
@shared_task
def check_expiring_subscriptions():
    """Codzienne sprawdzanie subskrypcji — 7:00."""
    now = timezone.now()

    # 1. Downgrade wygasłych
    expired = Subscription.objects.filter(
        valid_until__lte=now,
        status__in=['trial', 'af_trial', 'af_client_trial'],
    ).exclude(status='pilot')  # piloty NIE są downgrade'owane

    for sub in expired:
        if check_auto_extend(sub):
            continue  # przedłużono, nie downgrade'uj
        downgrade_to_free(sub)
        send_trial_email(sub, 'expired')

    # 2. Przypomnienia
    for days in [14, 7, 3, 1]:
        threshold = now + timedelta(days=days)
        expiring = Subscription.objects.filter(
            valid_until__date=threshold.date(),
            status__in=['trial', 'af_trial', 'af_client_trial'],
        )
        for sub in expiring:
            send_trial_email(sub, f'reminder_{days}d')

    # 3. Follow-up 7 dni po wygaśnięciu
    followup_date = now - timedelta(days=7)
    followup = Subscription.objects.filter(
        valid_until__date=followup_date.date(),
        status='expired',
    )
    for sub in followup:
        send_trial_email(sub, 'followup_7d')
```

### snapshot_monthly_usage

- **Harmonogram:** 1. dnia każdego miesiąca o 2:00
- **Zadanie:** tworzy migawkę danych użycia za poprzedni miesiąc
- **Cel:** analiza cenowa (Van Westendorp), raportowanie, retencja

---

## Architektura billing-ready

System jest przygotowany na integrację z **Stripe**, ale nie jest jeszcze aktywny.

### Przygotowane komponenty

```python
# Hooki Stripe (przygotowane, nieaktywne)

def handle_checkout_session_completed(event):
    """Stripe webhook: użytkownik opłacił subskrypcję."""
    session = event['data']['object']
    subscription = get_subscription_by_stripe_id(session['subscription'])
    subscription.status = 'active'
    subscription.plan = session['metadata']['plan']
    subscription.save()

def handle_subscription_updated(event):
    """Stripe webhook: zmiana planu lub odnowienie."""
    # ...

def handle_subscription_cancelled(event):
    """Stripe webhook: anulowanie subskrypcji."""
    # ...

# Customer portal
def get_customer_portal_url(company):
    """Generuje URL do portalu klienta Stripe (zarządzanie płatnością)."""
    # ...
```

### Plan aktywacji

1. Utworzenie konta Stripe i konfiguracja produktów/planów
2. Odkomentowanie `FeatureGateMiddleware` w `settings.py`
3. Podłączenie webhook endpoint `/billing/webhook/`
4. Konfiguracja zmiennych: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
5. Testy end-to-end na środowisku staging

**Planowany termin:** Sprint 7+ (po walidacji cennika przez użytkowników pilotażowych)

---

## Obsługa firm pilotażowych

Firmy pilotażowe mają specjalny status i obsługę:

- **Status:** `pilot` (NIE `trial`)
- **Brak automatycznego downgrade** — nigdy nie tracimy pilota automatycznie
- **Delikatne przypomnienia email** — informacyjne, nie presja sprzedażowa
- **Kontakt osobisty** — przed zakończeniem pilotażu, rozmowa z opiekunem
- **Konwersja:** pilot → active (po decyzji o zakupie) lub pilot → free (po rezygnacji, ręcznie)

```python
def handle_pilot_expiring(subscription: Subscription):
    """Specjalna obsługa wygasających pilotów."""
    # NIE downgrade'uj automatycznie
    # Wyślij powiadomienie do opiekuna handlowego
    notify_sales_team(
        subject=f"Pilot {subscription.company.name} wygasa za 14 dni",
        context={
            'company': subscription.company,
            'usage': get_usage_summary(subscription.company),
            'valid_until': subscription.valid_until,
        }
    )
```

---

## Śledzenie użycia

### Architektura dwuwarstwowa

**Warstwa 1: Redis (czas rzeczywisty)**
- Liczniki per firma per miesiąc
- Klucz: `usage:{company_id}:{YYYY-MM}:{metric}`
- TTL: 90 dni
- Aktualizacja: inkrementacja przy każdym zdarzeniu

**Warstwa 2: PostgreSQL (archiwum)**
- Migawka miesięczna (task `snapshot_monthly_usage`)
- Trwałe przechowywanie do analiz historycznych

### Śledzone metryki

| Metryka         | Redis key suffix  | Opis                              |
|-----------------|-------------------|-----------------------------------|
| `vehicles`      | `:vehicles`       | Liczba aktywnych pojazdów         |
| `drivers`       | `:drivers`        | Liczba aktywnych kierowców        |
| `trips`         | `:trips`          | Liczba zarejestrowanych przejazdów|
| `distance`      | `:distance`       | Suma przejechanych km             |
| `reports`       | `:reports`        | Wygenerowane raporty              |
| `exports`       | `:exports`        | Eksporty do systemów FK           |
| `logins`        | `:logins`         | Liczba logowań                    |
| `active_days`   | `:active_days`    | Dni z aktywnością (HyperLogLog)   |

### Model migawki

```python
class MonthlyUsageSnapshot(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    year = models.IntegerField()
    month = models.IntegerField()
    vehicles_count = models.IntegerField(default=0)
    drivers_count = models.IntegerField(default=0)
    trips_count = models.IntegerField(default=0)
    total_distance_km = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    reports_generated = models.IntegerField(default=0)
    exports_count = models.IntegerField(default=0)
    logins_count = models.IntegerField(default=0)
    active_days = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['company', 'year', 'month']
```

### Wykorzystanie danych

Dane o użyciu służą do:

- **Pricing discovery** — analiza metodą Van Westendorp: korelacja wartości postrzeganej z faktycznym użyciem
- **Segmentacja** — podział firm wg intensywności użycia (light/medium/heavy)
- **Personalizacja emaili** — "Przejechałeś 2 340 km w tym miesiącu — z planem Professional zaoszczędzisz X"
- **Decyzje produktowe** — które funkcje są najczęściej używane, priorytetyzacja roadmapy
- **Retencja** — wczesne wykrywanie churnu (spadek aktywności → proaktywny kontakt)
