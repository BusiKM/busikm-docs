# busikm-media — publiczne pliki marketingowe

Worker Cloudflare, który serwuje pliki z publicznego bucketu R2
`busikm-public` pod adresem **https://busikm-media.busikm.workers.dev**.
Trzymamy tam filmy i okładki strony, żeby nie puchło repozytorium.

Bucket aplikacji (`busikm-staging`) jest prywatny — Worker go nie widzi.

## Wgranie lub podmiana pliku

Panel Cloudflare → R2 → `busikm-public` → Upload, albo:

```bash
npx wrangler r2 object put busikm-public/film/wlasciciel-pl.mp4 \
  --file wlasciciel-pl.mp4 --content-type video/mp4 --remote
```

Plik pod tą samą nazwą dociera do odwiedzających najpóźniej po dobie
(`Cache-Control: max-age=3600, s-maxage=86400`). Pilna podmiana = nowa
nazwa pliku i zmiana adresu na stronie.

Film MP4 musi mieć metadane na początku pliku (`-movflags +faststart`),
inaczej przeglądarka pobiera całość, zanim cokolwiek pokaże.

## Wdrożenie Workera

```bash
cd media-worker
npx wrangler deploy
```

Worker obsługuje tylko GET i HEAD, zapytania Range (przewijanie filmu,
Safari) i If-None-Match. Gdy busikm.pl trafi do Cloudflare, można podpiąć
własną domenę (np. `media.busikm.pl`) i zmienić stałą `MEDIA`
w `landing/src/content/media.ts`.

## Rolki

Filmy, okładki i katalog rolek leżą pod `rolki/`. Zapisuje je
`rolki/synchronizuj.mjs` oraz `busikm-video`. Opis: `docs/landing/17-rolki.md`.

Worker ma też cron co 15 minut, który uruchamia akcję „Rolki” w GitHubie.
Potrzebuje sekretu `GITHUB_TOKEN` (`npx wrangler secret put GITHUB_TOKEN`);
`wrangler deploy` sekretów nie rusza.
