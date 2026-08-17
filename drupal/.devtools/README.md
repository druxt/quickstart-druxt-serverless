Local development without Docker. Just PHP, Composer, and SQLite.

Use this as an alternative to DDEV, not a replacement. Pick whichever fits your workflow.

Unlike quickstart's own `.devtools/`, this repo has real committed config and
content (exported via Tome). `provision` installs straight from it, instead
of a fresh `site:install`. Unlike quickstart-druxt-site-tome, there's no
simple_oauth/consumers here at all - this repo builds to full static output
(`nuxt generate`) with no live Drupal backend at runtime, so there's nothing
to authenticate against.

## Scripts

| Script | What it does |
| --- | --- |
| `assemble` | Install Composer dependencies. |
| `provision` | Install Drupal from committed config (`site-install --existing-config`). Import Tome content and files. |
| `start` | Start the PHP dev server. Write `BASE_URL` to `../.env`. |
| `stop` | Stop the dev server. |
| `info` | Show the current environment: PHP, Drupal, Composer, and Drush versions, webserver, database. |
| `seed-test-content` | Create one published Article node. Used by the Cypress e2e suite (`nuxt/cypress/e2e/content.cy.js`), not part of `provision` - the committed Tome content is meant to be installed as-is. |
| `helpers.php` | Shared functions the scripts above use. |
| `etc/php.ini` | Raises `memory_limit`. Drupal installs need more than PHP's 128M default. |

## Quick start

```bash
cd drupal
.devtools/assemble
.devtools/provision
.devtools/start
```

Then start the Nuxt frontend:

```bash
cd ../nuxt
npm install
npm run dev
```

Or with `make` (see the `Makefile` in this directory's parent):

```bash
make build   # assemble + provision + start
make stop
make reset   # wipe the database and stop the server
```

## Why `--existing-config`, not `tome:install`

`tome:install` runs a fresh `site-install` and *then* imports config as a
separate step. That fails here: the fresh install already generates its own
random site UUID before the import ever runs, and Drupal refuses to import
config whose `system.site` UUID doesn't match the target site
("Site UUID in source storage does not match the target storage").

`drush site-install --existing-config` installs directly from the config
directory in one step, adopting its site UUID instead of generating a new
one first. `tome:import` then only needs to bring in content and files -
config is already in place.

## Why the sqlite patch

The committed config is authored against DDEV's MySQL (`mysql: 0` in
`config/core.extension.yml`). Drupal won't uninstall the module providing
its own active database driver, so `provision` patches `sqlite: 0` into
that file additively - alongside `mysql`, never replacing it - and only in
your local checkout. It's never committed.

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `WEBSERVER_HOST` | `127.0.0.1` | PHP server bind host |
| `WEBSERVER_PORT` | auto-discovered (8888+) | PHP server port |
| `DB_FILE` | `/tmp/quickstart-serverless-drupal-site.sqlite` | SQLite database path |
| `XDEBUG` | unset | Set to any value to enable Xdebug |
