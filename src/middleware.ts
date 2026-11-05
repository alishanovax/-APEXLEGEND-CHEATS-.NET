import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect } from './config/checkout-redirects.mjs';
import { SLUG_REDIRECTS } from './config/slug-redirects.mjs';

function normalizePathname(pathname: string): string {
  if (pathname !== '/' && !pathname.endsWith('/')) {
    return `${pathname}/`;
  }
  return pathname;
}

function resolveSlugRedirect(pathname: string): string | null {
  const withSlash = normalizePathname(pathname);
  const target = SLUG_REDIRECTS[withSlash as keyof typeof SLUG_REDIRECTS];
  if (target && target !== withSlash) {
    return target;
  }
  return null;
}

export const onRequest = defineMiddleware((context, next) => {
  const pathname = new URL(context.request.url).pathname;

  const checkout = resolveCheckoutPathRedirect(pathname);
  if (checkout) {
    return context.redirect(checkout, 302);
  }

  const slugRedirect = resolveSlugRedirect(pathname);
  if (slugRedirect) {
    return context.redirect(slugRedirect, 301);
  }

  return next();
});
