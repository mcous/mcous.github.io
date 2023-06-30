import type { FunctionComponent, RenderableProps } from 'preact'

type Atom<E extends HTMLElement> = FunctionComponent<JSX.HTMLAttributes<E>>

interface ParsedProps<P> {
  id: string
  className: string
  passProps: Omit<P, 'class'>
}

export const parseProps = <
  P extends RenderableProps<JSX.HTMLAttributes<never>>
>(
  props: P
): ParsedProps<P> => {
  const { class: classInput, ...passProps } = props
  const id = typeof props.id === 'string' ? props.id : props.id?.value ?? ''
  const className =
    typeof classInput === 'string' ? classInput : classInput?.value ?? ''

  return { id, className, passProps }
}

export const Link: Atom<HTMLAnchorElement> = (props) => {
  const { className, passProps } = parseProps(props)

  return (
    <a
      class={`text-blue-700 visited:text-purple-700 hover:underline ${className}`}
      {...passProps}
    />
  )
}

export const HoverLink: Atom<HTMLAnchorElement> = (props) => {
  const { className, passProps } = parseProps(props)

  return (
    <a
      class={`transition-color hover:text-blue-700 ${className}`}
      {...passProps}
    />
  )
}

export const Copy: Atom<HTMLParagraphElement> = (props) => {
  const { className, passProps } = parseProps(props)

  return (
    <p class={`text-base leading-relaxed mt4 ${className}`} {...passProps} />
  )
}

export const Heading1: Atom<HTMLHeadingElement> = (props) => {
  const { className, passProps } = parseProps(props)

  return <h1 class={`mt-8 text-2xl text-center ${className}`} {...passProps} />
}

export const Heading2: Atom<HTMLHeadingElement> = (props) => {
  const { id, className, passProps } = parseProps(props)

  return (
    <h2 class={`mt-8 text-xl ${className}`} {...passProps}>
      {id ? (
        <a
          href={`#${id}`}
          class="hover:before:content-['#'] before:absolute before:ml--4 before:opacity-50"
        >
          {passProps.children}
        </a>
      ) : (
        passProps.children
      )}
    </h2>
  )
}

export const Heading3: Atom<HTMLHeadingElement> = (props) => {
  const { className, passProps } = parseProps(props)

  return <h2 class={`mt-4 text-lg ${className}`} {...passProps} />
}

export const OrderedList: Atom<HTMLOListElement> = (props) => {
  const { className, passProps } = parseProps(props)

  return (
    <ol class={`mt-4 list-decimal mt-4 pl-8 ${className}`} {...passProps} />
  )
}
export const UnorderedList: Atom<HTMLUListElement> = (props) => {
  const { className, passProps } = parseProps(props)

  return <ul class={`mt-4 list-disc mt-4 pl-8 ${className}`} {...passProps} />
}

export const ListItem: Atom<HTMLLIElement> = (props) => {
  const { className, passProps } = parseProps(props)

  return <li class={`text-base leading-relaxed ${className}`} {...passProps} />
}

export const PreformattedText: Atom<HTMLPreElement> = (props) => {
  const { className, passProps } = parseProps(props)

  return (
    <pre
      class={`mt-4 text-xs sm:text-sm w-148 max-w-screen self-center ${className}`}
      {...passProps}
    />
  )
}

export const Code: Atom<HTMLElement> = (props) => {
  const { className, passProps } = parseProps(props)
  const isBlock = className.includes('hljs')

  return (
    <code
      class={`font-mono ${
        isBlock ? 'rounded-lg !pa-4' : 'rounded px-1 py-0.5 bg-slate-200'
      } ${className}`}
      {...passProps}
    />
  )
}
