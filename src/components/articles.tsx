import type { Metadata } from '../renderer/page-context.ts'
import { HoverLink, Heading2 } from './atoms.tsx'

export interface ArticlesProps {
  entries: ArticleEntry[]
}

export interface ArticleEntry extends Metadata {
  href: string
}

export function Articles(props: ArticlesProps): JSX.Element {
  return (
    <nav>
      <Heading2 class="text-center">assorted thoughts</Heading2>
      <ol class="w-full">
        {props.entries.map(({ title, description, href, posted }) => (
          <li key={href} class="mt-4">
            <HoverLink href={href}>
              <div class="flex items-baseline">
                <h3 class="mt-0 mr-auto text-base">{title}</h3>
                <small class="font-light text-base ml-4 shrink-0">
                  {posted ?? 'DRAFT'}
                </small>
              </div>
              <p class="mt-1 font-light">{description}</p>
            </HoverLink>
          </li>
        ))}
      </ol>
    </nav>
  )
}
