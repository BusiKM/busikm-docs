/**
 * Publiczne pliki marketingowe BusiKM (filmy, okładki) z bucketu R2
 * `busikm-public`, pod adresem workers.dev.
 *
 * Tylko odczyt: GET i HEAD. Obsługuje zapytania Range — bez nich przeglądarka
 * nie przewinie filmu, a Safari w ogóle go nie odtworzy — oraz warunkowe
 * (If-None-Match), żeby ponowna wizyta nie ściągała pliku od nowa.
 *
 * Bucket aplikacji (`busikm-staging`) jest prywatny i ten Worker go nie widzi.
 */

interface R2Range {
  offset?: number;
  length?: number;
  suffix?: number;
}

interface R2ObjectBody {
  size: number;
  httpEtag: string;
  range?: R2Range;
  body?: ReadableStream;
  writeHttpMetadata(headers: Headers): void;
}

interface Env {
  BUCKET: {
    get(
      key: string,
      options?: { range?: Headers; onlyIf?: Headers },
    ): Promise<R2ObjectBody | null>;
    head(key: string): Promise<R2ObjectBody | null>;
  };
}

// Godzina w przeglądarce, doba w CDN. Nowa wersja filmu pod tą samą nazwą
// dociera do wszystkich najpóźniej po dobie; pilną podmianę robimy nową nazwą.
const CACHE = 'public, max-age=3600, s-maxage=86400';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }

    const key = decodeURIComponent(new URL(request.url).pathname.slice(1));
    if (!key || key.endsWith('/')) return new Response('Not Found', { status: 404 });

    const obj =
      request.method === 'HEAD'
        ? await env.BUCKET.head(key)
        : await env.BUCKET.get(key, { range: request.headers, onlyIf: request.headers });
    if (!obj) return new Response('Not Found', { status: 404 });

    const headers = new Headers();
    obj.writeHttpMetadata(headers);
    headers.set('ETag', obj.httpEtag);
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Cache-Control', CACHE);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('X-Content-Type-Options', 'nosniff');

    // Warunek If-None-Match spełniony: R2 zwraca obiekt bez treści.
    if (request.method === 'GET' && !obj.body) {
      return new Response(null, { status: 304, headers });
    }

    if (request.method === 'HEAD') {
      headers.set('Content-Length', String(obj.size));
      return new Response(null, { status: 200, headers });
    }

    const range = request.headers.has('Range') ? obj.range : undefined;
    if (range) {
      const start =
        range.suffix !== undefined ? obj.size - range.suffix : (range.offset ?? 0);
      const end =
        range.suffix !== undefined
          ? obj.size - 1
          : range.length !== undefined
            ? start + range.length - 1
            : obj.size - 1;
      headers.set('Content-Range', `bytes ${start}-${end}/${obj.size}`);
      headers.set('Content-Length', String(end - start + 1));
      return new Response(obj.body, { status: 206, headers });
    }

    headers.set('Content-Length', String(obj.size));
    return new Response(obj.body, { status: 200, headers });
  },
};
