import type { ArticleEntry } from '$lib/articles.ts'

export interface ArticleListProps {
  entries: ArticleEntry[]
}

export function ArticleList(props: ArticleListProps) {
  const { entries } = props

  return (
    <nav class="max-w-md w-full">
      <h2 class="mt-8 text-center text-xl">assorted thoughts</h2>
      <ol>
        {entries.map(({ id, slug, data: { title, description, posted } }) => (
          <li key={id} class="mt-4">
            <a
              href={`/articles/${slug}/`}
              class="transition-color hover:text-blue-700"
            >
              <div class="flex items-baseline">
                <h3 class="mr-auto mt-0 text-base">{title}</h3>
                <small class="ml-4 shrink-0 text-base font-light">
                  {posted?.toLocaleDateString() ?? 'DRAFT'}
                </small>
              </div>
              <p class="mt-1 font-light">{description}</p>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
