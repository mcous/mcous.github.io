import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { read, write } from 'to-vfile'
import { rehype } from 'rehype'
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeRewrite from 'rehype-rewrite'
import rehypeFormat from 'rehype-format'

import { render } from '../dist-ssr/ssr.js'

const DIST_DIR = join(dirname(fileURLToPath(import.meta.url)), '../dist')
const TEMPLATE = join(DIST_DIR, 'index.html')

const htmlFragParser = unified().use(rehypeParse, { fragment: true }).freeze()

const processor = rehype()
  .use(rehypeRewrite, {
    selector: 'body',
    rewrite: (node) => {
      node.children = [
        ...htmlFragParser.parse(render()).children,
        ...node.children,
      ]
    },
  })
  .use(rehypeFormat)
  .freeze()

read(TEMPLATE)
  .then((file) => processor.process(file))
  .then((result) => write(result))
  .then(() => console.log('App prerendered'))
  .catch((error) => {
    process.exitCode = 1
    console.error('Prerender failed', error)
  })
