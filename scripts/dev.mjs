/**
 * Start developing: bring up the backend if (and only if) BASE_URL points
 * at the local .devtools PHP server, then run the Nuxt dev server.
 *
 * DDEV / remote backends are used as-is and never started from here.
 */

import { NUXT_DIR, ensureBackend, exitWithError, foregroundNpm, isPortOpen } from './lib.mjs'

const PORT = Number(process.env.PORT) || 3000

/**
 * Refuse to start when the frontend port is taken: Nuxt's dev server
 * does not fail on a busy port, it falls back to a random one, and
 * everything that advertises the frontend URL then points at the wrong
 * place.
 */
async function ensureFrontendPortFree() {
  if (!(await isPortOpen('127.0.0.1', PORT))) {
    return
  }
  exitWithError(
    `Port ${PORT} is already in use.\n\n` +
      `  Nuxt would fall back to a random port. Free the port (another dev\n` +
      `  server, or another copy of this project), or start with\n` +
      `  \`PORT=<port> npm run dev\` to choose one deliberately.`
  )
}

async function main() {
  await ensureBackend()
  await ensureFrontendPortFree()
  console.log(`Starting the Nuxt dev server -> http://localhost:${PORT}`)
  console.log('')
  process.exitCode = await foregroundNpm(['run', 'dev'], { cwd: NUXT_DIR })
}

main().catch((error) => exitWithError(error.message))
