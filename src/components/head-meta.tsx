import { useEffect } from 'preact/hooks'
import type { Metadata } from '$renderer/types'

export interface HeadMetaProps {
  metadata: Metadata
}

export function HeadMeta(props: HeadMetaProps) {
  const { title, description } = props.metadata

  useEffect(() => {
    if (title) {
      window.document.title = title
    }
  }, [title])

  useEffect(() => {
    if (description) {
      window.document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', description)
    }
  }, [description])

  return <></>
}
