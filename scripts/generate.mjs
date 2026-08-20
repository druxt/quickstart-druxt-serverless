/**
 * Build full static output: ensure the backend is up (Drupal/Tome only
 * matter at build time here - the generated output in nuxt/dist/ has
 * no live backend dependency at runtime), then run `nuxt generate`.
 */

import { NUXT_DIR, ensureBackend, exitWithError, runNpm } from './lib.mjs'

async function main() {
  await ensureBackend()
  console.log('Building full static output (nuxt/dist)...')
  console.log('')
  runNpm(['run', 'generate'], { cwd: NUXT_DIR })
  console.log('')
  console.log('Static output ready: nuxt/dist')
}

main().catch((error) => exitWithError(error.message))
