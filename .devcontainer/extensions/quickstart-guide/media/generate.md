# Build static output

```bash
npm run generate
```

Ensures the backend is up, then writes the deployable output to `nuxt/dist/`.
Deploy that directory anywhere that serves static files. Production
needs only a static file host.

This is the real test of this starter-kit: Druxt fetches the JSON:API index
at build time (not runtime), so `generate` needs the live backend, but
nothing generated depends on it staying up afterwards.
