import { h } from 'preact'
import renderToString from 'preact-render-to-string'

import { App } from './components/app'

export function render(): string {
  return renderToString(<App />)
}
