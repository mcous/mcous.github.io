import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/preact'
import matchers from '@testing-library/jest-dom/matchers'
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare module 'vitest' {
  interface Assertion<T>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
}

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
