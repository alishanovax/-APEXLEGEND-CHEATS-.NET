/** Rewrite canonical/hreflang/og:url to match the request host (preview vs production). */
function trailingSlashPath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function rewriteHtmlSeoUrls(html, origin, pathname) {
  const canonical = `${origin}${trailingSlashPath(pathname)}`;
  return html
    .replace(/<link rel="canonical" href="[^"]*"/g, `<link rel="canonical" href="${canonical}"`)
    .replace(
      /<link rel="alternate" hreflang="(en|en-US|x-default)" href="[^"]*"/g,
      (_match, lang) => `<link rel="alternate" hreflang="${lang}" href="${canonical}"`,
    )
    .replace(/<meta property="og:url" content="[^"]*"/g, `<meta property="og:url" content="${canonical}"`);
}

function isXmlOrFeedPath(pathname) {
  return (
    pathname === '/rss.xml' ||
    pathname.endsWith('.xml') ||
    /^\/sitemap(-|$)/.test(pathname)
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (isXmlOrFeedPath(url.pathname)) {
      const response = await env.ASSETS.fetch(request);
      const headers = new Headers(response.headers);
      if (response.status === 200 && !headers.get('content-type')?.toLowerCase().includes('xml')) {
        headers.set('Content-Type', 'application/xml; charset=utf-8');
      }
      headers.delete('content-length');
      return new Response(response.body, { status: response.status, headers });
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') ?? '';
    if (response.status !== 200 || !contentType.includes('text/html')) {
      return response;
    }

    const html = await response.text();
    const body = rewriteHtmlSeoUrls(html, url.origin, url.pathname);
    const headers = new Headers(response.headers);
    headers.delete('content-length');
    return new Response(body, { status: response.status, headers });
  },
};
