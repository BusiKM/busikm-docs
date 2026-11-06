#!/usr/bin/env node
/**
 * Przenosi rolki ze strony na Facebooku do R2. Uruchamiany co godzinę przez
 * .github/workflows/rolki.yml, a pełny opis jest w docs/landing/17-rolki.md.
 *
 *   FB_TOKEN=… node media-worker/rolki/synchronizuj.mjs
 *   FB_TOKEN=… node media-worker/rolki/synchronizuj.mjs --lokalnie /tmp/media
 *
 * Facebook jest źródłem listy: co tam jest opublikowane, jest też na stronie,
 * a co zniknęło, znika. Lepszy plik bierzemy z poczekalni, do której wrzuca
 * go `busikm-video` po renderze. Bez niego zostaje plik z Facebooka, przeliczony
 * na H.264, bo starsze rolki Facebook oddaje w AV1, a tego nie odtworzy
 * starszy iPhone.
 *
 * Skrypt nigdy nie wypisuje adresów z Facebooka: są podpisane, a logi akcji
 * w publicznym repozytorium widzi każdy. Token idzie nagłówkiem, nie adresem.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createWriteStream, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const STRONA = '1317391384798395';
const GRAPH = process.env.GRAPH_URL || 'https://graph.facebook.com/v27.0';
const MEDIA = 'https://busikm-media.busikm.workers.dev';
const BUCKET = 'busikm-public';
const POLA = 'id,description,created_time,length,published,status,source,thumbnails{uri,is_preferred}';
/** Ile sekund mogą się różnić film z poczekalni i rolka, żeby uznać je za to samo. */
const TOLERANCJA = 0.05;

const TUTAJ = dirname(fileURLToPath(import.meta.url));

/**
 * Kategoria rolki to hashtag w opisie na Facebooku. Wielkość liter i polskie
 * znaki nie mają znaczenia, a tagi dopisuje `busikm-video` (reels-playbook).
 */
const HASHTAGI = { wtrasie: 'trasa', wbiurze: 'biuro', nakoniecmiesiaca: 'miesiac', zzyciafirmy: 'firma' };

/**
 * Przycisk pod filmem, zgadywany z opisu. Pierwsze dopasowanie wygrywa, a pomyłkę
 * prostuje wpis w nadpisania.json. Temat z tej tabeli to wyjście awaryjne dla
 * rolki bez hashtagu kategorii.
 */
const TEMATY = [
  [/ksef|faktur|zleceni/i, 'biuro', '/co-robi/zlecenia-i-faktury'],
  [/paragon|koszt/i, 'miesiac', '/co-robi/koszty-i-paragony'],
  [/księgow/i, 'miesiac', '/co-robi/dane-dla-ksiegowej'],
  [/dokument|termin|przegląd/i, 'miesiac', '/co-robi/dokumenty-i-terminy'],
  [/tachograf|przerw|czas\w* pracy/i, 'trasa', '/co-robi/czas-pracy'],
  [/ładun|map[aeęy]\b|gdzie jest/i, 'trasa', '/co-robi/trasy-i-mapa'],
  [/dyspozyt/i, 'biuro', '/co-robi/dyspozytornia'],
  [/zysk|rentown|zostaje/i, 'biuro', '/co-robi/rentownosc'],
  [/cennik|płacisz/i, 'biuro', '/cennik'],
];

/**
 * Zdania, które na Facebooku mają sens, a na stronie nie. Pierwsza grupa to
 * wezwania do komentarzy i kliknięcia. Druga pilnuje zasady „zero przepisów":
 * na stronie nie podajemy limitów, kar ani podstaw prawnych.
 */
const POZA_STRONA = /\?|#|busikm\.pl|14 dni|zarejestruj|link w|\b\d+([,.]\d+)? ?h\b|\b\d+ min\b|\bco \d+ dni\b|\bart\.|\bkar[aęy]\b|obowiązuj|rozporządz|ustaw[ayę]\b/i;

function zdania(tekst) {
  return tekst
    .split('\n')
    .map((l) => l.trim())
    // Punkty wyliczenia nie czytają się bez swojego wstępu. Emoji na początku
    // wiersza to u nas też punkt albo wezwanie, więc odpada przed czyszczeniem.
    .filter((l) => l && !/^(\d+[.)]|[-•#]|\p{Extended_Pictographic})/u.test(l))
    .map((l) => l.replace(/\p{Extended_Pictographic}|️/gu, '').trim())
    .flatMap((l) => l.split(/(?<=[.!?…])\s+/))
    .map((z) => z.trim())
    // Zapowiedź wyliczenia, które właśnie wycięliśmy. Dłuższa ma własną treść.
    .flatMap((z) => (z.endsWith(':') ? (z.length < 30 ? [] : [`${z.slice(0, -1)}.`]) : [z]))
    .filter(Boolean);
}

/** Tytuł to pierwsze zdanie opisu, zgodnie z zasadą z reels-playbook: pierwsze zdanie to hak. */
export function tekstZOpisu(opis = '') {
  const [pierwsze = 'Rolka BusiKM', ...reszta] = zdania(opis);
  let tytul = pierwsze.replace(/[.…]+$/, '');
  if (tytul.length > 90) tytul = `${tytul.slice(0, 90).replace(/\s+\S*$/, '')}…`;

  const wybrane = [];
  for (const z of reszta) {
    if (POZA_STRONA.test(z)) continue;
    if ([...wybrane, z].join(' ').length > 220) break;
    wybrane.push(z);
  }
  return { tytul, opis: wybrane.join(' ') };
}

export function slugZTytulu(tytul) {
  return bezZnakow(tytul)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
    .replace(/-$/, '');
}

function bezZnakow(tekst) {
  return tekst.toLowerCase().replace(/ł/g, 'l').normalize('NFD').replace(/\p{M}/gu, '');
}

export function dopasujTemat(opis = '') {
  const trafienie = TEMATY.find(([wzor]) => wzor.test(opis));
  const hashtag = [...opis.matchAll(/#([\p{L}\d]+)/gu)].map((m) => HASHTAGI[bezZnakow(m[1])]).find(Boolean);
  return {
    temat: hashtag ?? trafienie?.[1] ?? 'firma',
    cel: trafienie?.[2] ?? '/demo',
    zHashtagu: Boolean(hashtag),
  };
}

/**
 * Film z poczekalni dla rolki. Wskazanie numeru wygrywa, a po długości bierzemy
 * wyłącznie jedynego kandydata: dwie rolki potrafią mieć identyczną długość,
 * a zły film na stronie jest gorszy niż plik w niższej jakości.
 */
export function znajdzWPoczekalni(rolka, poczekalnia) {
  const wskazany = poczekalnia.find((p) => p.fb === rolka.id);
  if (wskazany) return wskazany;
  const kandydaci = poczekalnia.filter((p) => !p.fb && Math.abs(p.sekundy - rolka.length) <= TOLERANCJA);
  return kandydaci.length === 1 ? kandydaci[0] : null;
}

/**
 * Lista rolek wymaga klucza strony, a konto techniczne ma klucz użytkownika.
 * Klucz strony żyje tylko w pamięci tego przebiegu, a GitHub nie zna go jako
 * sekretu, więc maskujemy go w logu sami.
 */
async function kluczStrony(token) {
  const odp = await fetch(`${GRAPH}/${STRONA}?fields=access_token`, { headers: { Authorization: `Bearer ${token}` } });
  const dane = await odp.json().catch(() => ({}));
  if (!odp.ok || !dane.access_token) {
    throw new Error(`Klucz strony, HTTP ${odp.status}: ${dane.error?.message ?? 'brak w odpowiedzi'}`);
  }
  if (process.env.GITHUB_ACTIONS) console.log(`::add-mask::${dane.access_token}`);
  return dane.access_token;
}

/** Bez `paging.next`, bo Facebook dokleja do niego token. Kursor wystarcza. */
async function rolkiZFacebooka(token) {
  const wynik = [];
  let po = '';
  do {
    const adres = `${GRAPH}/${STRONA}/video_reels?fields=${encodeURIComponent(POLA)}&limit=50${po ? `&after=${encodeURIComponent(po)}` : ''}`;
    const odp = await fetch(adres, { headers: { Authorization: `Bearer ${token}` } });
    const dane = await odp.json().catch(() => ({}));
    if (!odp.ok) throw new Error(`Facebook HTTP ${odp.status}: ${dane.error?.message ?? 'brak opisu'}`);
    wynik.push(...dane.data);
    po = dane.paging?.next ? dane.paging.cursors.after : '';
  } while (po);
  return wynik.filter((r) => r.published && r.status?.publishing_phase?.publish_status !== 'scheduled');
}

/**
 * Dostęp do R2 przez API S3. Klucz Cloudflare ma prawo zapisu tylko do jednego
 * bucketa, a takiego klucza `wrangler` nie przyjmuje (403). Dane logowania S3
 * wyprowadza się z niego: identyfikator klucza i SHA-256 jego wartości.
 */
async function daneS3() {
  const konto = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!konto || !token) throw new Error('Brak CLOUDFLARE_ACCOUNT_ID albo CLOUDFLARE_API_TOKEN');
  const odp = await fetch(`https://api.cloudflare.com/client/v4/accounts/${konto}/tokens/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const dane = await odp.json().catch(() => ({}));
  if (!odp.ok || !dane.result?.id) throw new Error(`Klucz Cloudflare, HTTP ${odp.status}`);
  const haslo = createHash('sha256').update(token).digest('hex');
  if (process.env.GITHUB_ACTIONS) console.log(`::add-mask::${haslo}`);
  return {
    adres: `https://${konto}.r2.cloudflarestorage.com`,
    env: {
      ...process.env,
      AWS_ACCESS_KEY_ID: dane.result.id,
      AWS_SECRET_ACCESS_KEY: haslo,
      AWS_DEFAULT_REGION: 'auto',
      // Sumy kontrolne dokładane domyślnie przez nowsze AWS CLI R2 odrzuca.
      AWS_REQUEST_CHECKSUM_CALCULATION: 'when_required',
      AWS_RESPONSE_CHECKSUM_VALIDATION: 'when_required',
    },
  };
}

function magazyn(lokalnie, s3) {
  return {
    async czytaj(klucz) {
      if (lokalnie) {
        const plik = join(lokalnie, 'rolki', klucz);
        return existsSync(plik) ? JSON.parse(readFileSync(plik, 'utf8')) : [];
      }
      const odp = await fetch(`${MEDIA}/rolki/${klucz}?t=${Date.now()}`);
      if (odp.status === 404) return [];
      // Inny błąd to nie „pusto": zapis skasowałby wszystkie rolki.
      if (!odp.ok) throw new Error(`Nie udało się pobrać ${klucz}: HTTP ${odp.status}`);
      return odp.json();
    },
    zapisz(klucz, plik, typ) {
      if (lokalnie) {
        const cel = join(lokalnie, 'rolki', klucz);
        mkdirSync(dirname(cel), { recursive: true });
        writeFileSync(cel, readFileSync(plik));
        return;
      }
      execFileSync(
        'aws',
        ['s3', 'cp', plik, `s3://${BUCKET}/rolki/${klucz}`, '--endpoint-url', s3.adres, '--content-type', typ, '--only-show-errors'],
        { env: s3.env, stdio: ['ignore', 'ignore', 'inherit'] },
      );
    },
  };
}

async function pobierz(adres, plik) {
  const odp = await fetch(adres);
  if (!odp.ok) throw new Error(`Pobieranie z Facebooka: HTTP ${odp.status}`);
  await pipeline(Readable.fromWeb(odp.body), createWriteStream(plik));
}

function ffmpeg(...args) {
  execFileSync('ffmpeg', ['-y', '-v', 'error', ...args], { stdio: ['ignore', 'ignore', 'inherit'] });
}

async function main() {
  const token = process.env.FB_TOKEN;
  if (!token) throw new Error('Brak FB_TOKEN');
  const i = process.argv.indexOf('--lokalnie');
  const lokalnie = i > -1 ? resolve(process.argv[i + 1]) : null;

  const m = magazyn(lokalnie, lokalnie ? null : await daneS3());
  const nadpisania = JSON.parse(readFileSync(join(TUTAJ, 'nadpisania.json'), 'utf8'));
  const rolki = await rolkiZFacebooka(await kluczStrony(token));
  // Pusta odpowiedź przy kilkudziesięciu rolkach to raczej awaria niż decyzja.
  if (!rolki.length) throw new Error('Facebook zwrócił pustą listę, niczego nie zmieniam');

  const [katalog, poczekalnia] = await Promise.all([m.czytaj('katalog.json'), m.czytaj('poczekalnia.json')]);
  const wKatalogu = new Map(katalog.map((r) => [r.fb, r]));
  const zajete = new Set(katalog.map((r) => r.plik));
  let wolne = poczekalnia.filter((p) => !zajete.has(p.plik));
  const robocze = mkdtempSync(join(tmpdir(), 'busikm-rolki-'));
  const nowy = [];

  try {
    for (const r of rolki) {
      const zmiana = nadpisania[r.id] ?? {};
      if (zmiana.ukryta) continue;

      const stara = wKatalogu.get(r.id);
      const lepszy = !stara || stara.zrodlo === 'facebook' ? znajdzWPoczekalni(r, wolne) : null;

      let plik = stara?.plik;
      let zrodlo = stara?.zrodlo;
      if (lepszy) {
        plik = lepszy.plik;
        zrodlo = 'poczekalnia';
        wolne = wolne.filter((p) => p !== lepszy);
      } else if (!stara) {
        // Świeża rolka bywa jeszcze w obróbce. Wróci przy następnym przebiegu.
        if (!r.source) {
          console.log(`Pomijam ${r.id}: Facebook nie ma jeszcze pliku`);
          continue;
        }
        const surowy = join(robocze, `${r.id}-surowy.mp4`);
        const gotowy = join(robocze, `${r.id}.mp4`);
        await pobierz(r.source, surowy);
        ffmpeg(
          '-i', surowy,
          '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p',
          '-c:a', 'aac', '-b:a', '128k',
          '-movflags', '+faststart',
          gotowy,
        );
        plik = `pliki/fb-${r.id}.mp4`;
        zrodlo = 'facebook';
        m.zapisz(plik, gotowy, 'video/mp4');
      }

      let okladka = stara?.okladka;
      if (!okladka) {
        const miniatury = r.thumbnails?.data ?? [];
        const adres = (miniatury.find((t) => t.is_preferred) ?? miniatury[0])?.uri;
        if (!adres) {
          console.log(`Pomijam ${r.id}: Facebook nie ma jeszcze okładki`);
          continue;
        }
        const surowa = join(robocze, `${r.id}-surowa.jpg`);
        const gotowa = join(robocze, `${r.id}.jpg`);
        await pobierz(adres, surowa);
        ffmpeg('-i', surowa, '-vf', 'scale=540:-2', '-q:v', '3', gotowa);
        okladka = `pliki/fb-${r.id}.jpg`;
        m.zapisz(okladka, gotowa, 'image/jpeg');
      }

      const tekst = tekstZOpisu(r.description);
      const temat = dopasujTemat(r.description);
      if (!temat.zHashtagu && !zmiana.temat) console.log(`Bez hashtagu kategorii: ${r.id}, przyjmuję ${temat.temat}`);
      let slug = zmiana.slug ?? stara?.slug ?? slugZTytulu(zmiana.tytul ?? tekst.tytul);
      if (nowy.some((n) => n.slug === slug)) slug = `${slug}-${r.id.slice(-6)}`;

      nowy.push({
        slug,
        fb: r.id,
        tytul: zmiana.tytul ?? tekst.tytul,
        opis: zmiana.opis ?? tekst.opis,
        temat: zmiana.temat ?? temat.temat,
        cel: zmiana.cel ?? temat.cel,
        data: r.status?.publishing_phase?.publish_time ?? r.created_time,
        sekundy: Math.round(r.length),
        plik,
        okladka,
        zrodlo,
      });
      console.log(stara ? `Bez zmian pliku: ${slug}` : `Nowa rolka: ${slug} (${zrodlo})`);
    }

    nowy.sort((a, b) => Date.parse(b.data) - Date.parse(a.data));

    // Katalog dopiero po plikach: strona nie może wskazać filmu, którego jeszcze nie ma.
    if (JSON.stringify(nowy) !== JSON.stringify(katalog)) {
      const plik = join(robocze, 'katalog.json');
      writeFileSync(plik, JSON.stringify(nowy, null, 2));
      m.zapisz('katalog.json', plik, 'application/json');
      console.log(`Katalog zapisany: ${nowy.length} rolek`);
    } else {
      console.log('Katalog bez zmian');
    }

    if (wolne.length !== poczekalnia.length) {
      const plik = join(robocze, 'poczekalnia.json');
      writeFileSync(plik, JSON.stringify(wolne, null, 2));
      m.zapisz('poczekalnia.json', plik, 'application/json');
    }
  } finally {
    rmSync(robocze, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(`Błąd: ${e.message}`);
    process.exit(1);
  });
}
