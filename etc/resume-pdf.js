import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'

const SOURCE_PATHNAME = '/resume/'
const PDF_FILENAME = 'michael-cousins.pdf'

/**
 * Astro middleware to build and serve the resume PDF.
 *
 * @type {() => import('astro').AstroIntegration}
 */
export const resumePDF = () => {
  let baseURL = ''

  return {
    name: 'resume-pdf',
    hooks: {
      'astro:config:done': ({ config }) => {
        baseURL = `http://localhost:${config.server.port}/`
      },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(`/${PDF_FILENAME}`, (_, response, next) => {
          renderResumePDF(baseURL)
            .then((contents) => {
              response.setHeader('Content-Type', 'application/pdf')
              response.end(contents)
            })
            .catch((error) => next(error))
        })
      },
      'astro:build:done': async ({ dir }) => {
        const outputFile = path.join(fileURLToPath(dir), PDF_FILENAME)

        await buildResumePDF(baseURL, outputFile)
      },
    },
  }
}

/**
 * Render the resume PDF to a buffer or file path
 *
 * @param {string} baseURL URL of the server
 * @param {string} [outputFile] output file, if needed
 * @returns buffer of PDF contents
 */
async function renderResumePDF(baseURL, outputFile) {
  const browser = await chromium.launch()
  const page = await browser.newPage({ baseURL })
  const pdfOptions = outputFile ? { path: outputFile } : {}

  await page.goto(SOURCE_PATHNAME)
  const result = await page.pdf({ tagged: true, ...pdfOptions })
  await browser.close()

  return result
}

/**
 * Build the resume PDF to a file from the preview server.
 *
 * @param {string} baseURL URL of the server
 * @param {string} [outputFile] output file, if needed
 */
async function buildResumePDF(baseURL, outputFile) {
  const { end } = await launchPreviewServer()

  try {
    await renderResumePDF(baseURL, outputFile)
  } finally {
    end()
  }
}

/**
 * Launch the preview server.
 *
 * @returns {Promise<{end: () => void}>} the URL of the server
 */
async function launchPreviewServer() {
  const server = spawn('pnpm', ['exec', 'astro', 'preview'])
  const end = () => server.kill()

  return new Promise((resolve, reject) => {
    server.stdout.on('data', () => {
      resolve({ end })
    })

    server.stdout.on('error', (error) => {
      end()
      reject(error)
    })
  })
}
