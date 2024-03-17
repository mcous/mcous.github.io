import type { FunctionComponent } from 'preact'

export interface BodyProps {
  class?: string
}

export const Body: FunctionComponent<BodyProps> = ({
  children,
  class: className = '',
}) => (
  <body
    class={`overflow-x-hidden font-sans -mr-[calc(100vw-100%)] ${className}`}
  >
    {children}
  </body>
)
