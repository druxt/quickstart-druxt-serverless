#!/usr/bin/env bash
#
# Start the Drupal backend on every container start. Without this, stopping and
# resuming a container leaves the frontend pointing at a backend that is no
# longer listening, which looks like a broken install rather than a stopped
# process.
#
# Skipped, with a pointer, when the site was never provisioned (a post-create
# that failed part way), so one broken create does not also fail every start.
set -euo pipefail

cd drupal
if [ ! -f web/sites/default/settings.local.php ]; then
  echo "The Drupal backend is not provisioned. Run: npm run setup" >&2
  exit 0
fi
.devtools/start
