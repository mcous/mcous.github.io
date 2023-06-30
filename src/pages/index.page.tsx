import { entries as articleEntries } from './articles/entries.ts'
import { Articles } from '../components/articles.tsx'

export const metadata = {
  title: 'Michael Cousins',
  description: `Michael Cousins is a software engineer working
in JavaScript, Python, Go, and [insert language here].
He's powered by caffeine and semantically versioned.`,
}

export function Page(): JSX.Element {
  return (
    <>{articleEntries.length > 0 && <Articles entries={articleEntries} />}</>
  )
}
