import * as Sentry from '@sentry/astro';

// Rep 1: sharing wmpiew/blueprint Sentry project (org perms block creating a
// separate blueprint-sequel project via MCP — see .opus/outbox/000-reply.md).
const DSN =
  import.meta.env['PUBLIC_SENTRY_DSN'] ??
  'https://e929fa68eabd4a64f476cb46a4e9a9fc@o4511051808899072.ingest.de.sentry.io/4511179806736464';

Sentry.init({
  dsn: DSN,
  environment: import.meta.env['PUBLIC_VERCEL_ENV'] ?? import.meta.env.MODE,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
});
