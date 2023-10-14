import { articleEntries } from '$lib/article-entries.ts'
import { Articles } from '$components/articles.tsx'
import type { Metadata } from '$renderer/types.ts'

export const metadata = {
  title: 'Michael Cousins',
  description: `Michael Cousins is a software engineer working
in JavaScript, Python, Go, and [insert language here].
He's powered by caffeine and semantically versioned.`,
} satisfies Metadata

export function Page(): JSX.Element {
  return <Articles entries={articleEntries} />
}
