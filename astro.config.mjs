// @ts-check
import { defineConfig } from 'astro/config';
import sentry from '@sentry/astro';

// Rep 1 of the 5-rep clone ladder. Target: sequel.co. Stack: Astro per ADR 001.
// Sentry DSN + runtime options live in sentry.client.config.ts / sentry.server.config.ts
// per @sentry/astro 10+ guidance. Source-map upload options stay here because they
// are build-time, not runtime.
const sourceMapsUploadOptions = {
  project: 'blueprint',
  org: 'wmpiew',
  telemetry: false,
  ...(process.env.SENTRY_AUTH_TOKEN ? { authToken: process.env.SENTRY_AUTH_TOKEN } : {}),
};

// https://astro.build/config
export default defineConfig({
  site: 'https://blueprint-sequel.vercel.app',
  integrations: [sentry({ sourceMapsUploadOptions })],
});
