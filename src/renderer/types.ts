import type { ComponentChildren, ComponentType } from 'preact'

export type PageProps = Record<string, never>

export interface Metadata {
  title: string
  description: string
  posted?: string
  updated?: string
}

export interface LayoutProps {
  metadata: Metadata
  children: ComponentChildren
}

export interface PageExports {
  Layout?: ComponentType<LayoutProps>
  metadata?: Metadata
}

export interface MDXPageGetter {
  getPage: (routeParams: Record<string, string>) => Promise<MDXPage>
}

export interface MDXPage {
  Page: ComponentType<PageProps>
  metadata?: Metadata
}

export type Page = ComponentType<PageProps> | MDXPageGetter

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vike {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Config extends PageExports {}

    interface PageContext {
      Page: Page
      exports: PageExports
    }
  }
}
