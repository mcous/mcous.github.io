declare module '*.mdx' {
  import type { ComponentType } from 'preact'
  import type { Metadata } from '$renderer/types'

  const page: ComponentType<Record<string, never>>
  const metadata: Metadata

  export default page
  export { metadata }
}
