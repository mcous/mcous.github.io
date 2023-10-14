import type { ComponentChildren } from 'preact'

export interface RootLayoutProps {
  children: ComponentChildren
}

export function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <main class="mx-auto max-w-148 flex flex-col items-center px-4">
      {children}
    </main>
  )
}
