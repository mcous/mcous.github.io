import { SocialsNav } from './socials-nav'

export function App(): JSX.Element {
  return (
    <div class="pt-32 text-center">
      <div class="w-32 h-32 mx-auto border-current border-2 rounded-full">
        <h1 class="my-0 pt-8 text-2xl leading-tight font-normal">
          mike
          <br />
          cousins
        </h1>
      </div>

      <div class="mt-4 mb-8 text-xl leading-normal ">
        <p class="my-0">/[a-z]+ware engineer/</p>
        <p class="my-0 text-base font-light">
          * warranty void if coffee is removed
        </p>
      </div>

      <SocialsNav class="my-8 text-2xl leading-none" />
    </div>
  )
}
