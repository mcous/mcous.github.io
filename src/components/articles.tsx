import type { ArticleEntry } from '$lib/article-entries.ts'
import { HoverLink, Heading2 } from './atoms.tsx'

export interface ArticlesProps {
  entries: ArticleEntry[]
}

export function Articles(props: ArticlesProps): JSX.Element {
  return (
    <nav class="max-w-112 w-full">
      <Heading2 class="text-center">assorted thoughts</Heading2>
      <ol>
        {props.entries.map(({ title, description, href, posted }) => (
          <li key={href} class="mt-4">
            <HoverLink href={href}>
              <div class="flex items-baseline">
                <h3 class="mr-auto mt-0 text-base">{title}</h3>
                <small class="ml-4 shrink-0 text-base font-light">
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
