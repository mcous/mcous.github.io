import type { FunctionComponent, RenderableProps } from 'preact'

type Atom<E extends HTMLElement> = FunctionComponent<JSX.HTMLAttributes<E>>

export const parseProps = <
  P extends RenderableProps<JSX.HTMLAttributes<never>>
>(
  props: P
): { className: string; otherProps: Omit<P, 'class'> } => {
  const { class: className, ...otherProps } = props

  if (!className) return { className: '', otherProps }
  if (typeof className === 'string') return { className, otherProps }
  return { className: className.value ?? '', otherProps }
}

export const Link: Atom<HTMLAnchorElement> = (props) => {
  const { className, otherProps } = parseProps(props)

  return (
    <a
      class={`text-blue-700 visited:text-purple-700 hover:underline ${className}`}
      {...otherProps}
    />
  )
}

export const HoverLink: Atom<HTMLAnchorElement> = (props) => {
  const { className, otherProps } = parseProps(props)

  return (
    <a
      class={`transition-color hover:text-blue-700 hover:visited:text-purple-700 ${className}`}
      {...otherProps}
    />
  )
}

export const Copy: Atom<HTMLParagraphElement> = (props) => {
  const { className, otherProps } = parseProps(props)

  return (
    <p class={`text-base leading-relaxed mt4 ${className}`} {...otherProps} />
  )
}

export const Heading1: Atom<HTMLHeadingElement> = (props) => {
  const { className, otherProps } = parseProps(props)

  return <h1 class={`mt-8 text-2xl text-center ${className}`} {...otherProps} />
}

export const Heading2: Atom<HTMLHeadingElement> = (props) => {
  const { className, otherProps } = parseProps(props)

  return <h2 class={`mt-4 text-xl ${className}`} {...otherProps} />
}

export const Heading3: Atom<HTMLHeadingElement> = (props) => {
  const { className, otherProps } = parseProps(props)

  return <h2 class={`mt-4 text-lg ${className}`} {...otherProps} />
}

export const OrderedList: Atom<HTMLOListElement> = (props) => {
  const { className, otherProps } = parseProps(props)

  return (
    <ol class={`mt-4 list-decimal mt-4 pl-8 ${className}`} {...otherProps} />
  )
}
export const UnorderedList: Atom<HTMLUListElement> = (props) => {
  const { className, otherProps } = parseProps(props)

  return <ul class={`mt-4 list-disc mt-4 pl-8 ${className}`} {...otherProps} />
}

export const ListItem: Atom<HTMLLIElement> = (props) => {
  const { className, otherProps } = parseProps(props)

  return <li class={`text-base leading-relaxed ${className}`} {...otherProps} />
}

export const PreformattedText: Atom<HTMLPreElement> = (props) => {
  const { className, otherProps } = parseProps(props)

  return (
    <pre
      class={`mt-4 text-xs sm:text-sm w-160 max-w-screen self-center ${className}`}
      {...otherProps}
    />
  )
}

export const Code: Atom<HTMLElement> = (props) => {
  const { className, otherProps } = parseProps(props)
  const isBlock = className.includes('hljs')

  return (
    <code
      class={`font-mono ${
        isBlock ? 'rounded-lg' : 'rounded px-1 py-0.5 bg-slate-200'
      } ${className}`}
      {...otherProps}
    />
  )
}
