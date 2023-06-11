import type { LayoutProps } from '../renderer/page-context.tsx'

export function Layout(props: LayoutProps) {
  const { children } = props

  return <main class="max-w-96 mt-8 mx-auto">{children}</main>
}
