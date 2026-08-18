# Druxt Quickstart (Serverless)

A fully decoupled starter-kit: **Drupal 11** + **Tome** (backend, content-as-files) + **Nuxt 2** (frontend, via [DruxtSite](https://druxtjs.org)) - built to output **full static HTML**, deployable to any CDN. Drupal and Tome only matter at build time. There's no live backend to run in production.

If you opened this in a dev container / DevPod, setup already ran automatically (`npm install` at the repository root provisions the whole stack: frontend deps, Composer, and a local Drupal site installed straight from the committed Tome config/content).

| Service        | URL                                 |
| -------------- | ----------------------------------- |
| Drupal backend | http://127.0.0.1:8888               |
| Nuxt frontend  | not started yet - see the next step |

If setup hasn't run yet (e.g. you cloned this manually), run `npm run setup` in a terminal first.
