import * as Sentry from '@sentry/astro';

const DSN =
  process.env['SENTRY_DSN'] ??
  'https://e929fa68eabd4a64f476cb46a4e9a9fc@o4511051808899072.ingest.de.sentry.io/4511179806736464';

Sentry.init({
  dsn: DSN,
  environment: process.env['VERCEL_ENV'] ?? process.env['NODE_ENV'] ?? 'development',
  release: process.env['VERCEL_GIT_COMMIT_SHA'],
  tracesSampleRate: 0.1,
});
