import type { ComponentChildren, ComponentType } from 'preact'
import type { PageContextBuiltIn } from 'vite-plugin-ssr/types'
import type { PageContextBuiltInClientWithClientRouting } from 'vite-plugin-ssr/types'

import type { HeaderProps } from '../components/header.tsx'

export type PageProps = Record<string, never>

export interface Metadata {
  title: string
  description: string
  posted?: string
  updated?: string
}

export interface LayoutProps {
  metadata: Metadata
  children?: ComponentChildren
}

export interface PageContextServer extends PageContextBuiltIn<ComponentType> {
  exports: {
    Layout?: ComponentType<LayoutProps>
    headerProps?: HeaderProps
    metadata: Metadata
  }
}

export interface PageContextClient
  extends PageContextBuiltInClientWithClientRouting<ComponentType> {
  exports: {
    Layout?: ComponentType<LayoutProps>
    headerProps?: HeaderProps
    metadata: Metadata
  }
}
