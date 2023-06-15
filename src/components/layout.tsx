import type { LayoutProps } from '../renderer/page-context.tsx'

export function Layout(props: LayoutProps) {
  const { children } = props

  return <main class="max-w-112 mt-8 mx-auto px-4">{children}</main>
}
