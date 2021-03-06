/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/export */
import { render as defaultRender } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

import type { Url } from 'next-router-mock'



type DefaultRenderParams = Parameters<typeof defaultRender>
type DefaultRenderOptions = DefaultRenderParams[1]


/**
 * TODO: To be extended with custom common providers
 */
function customRender (
  ui: React.ReactElement,
  options?: Omit<DefaultRenderOptions, 'wrapper'>,
) {
  return defaultRender(ui, {
    wrapper: ({ children }) => children,
    ...options,
  })
}

export function renderWithProviders (
  providers: React.JSXElementConstructor<{children: React.ReactElement}>,
) {
  return (
    ui: React.ReactElement,
    options?: Omit<DefaultRenderOptions, 'wrapper'>,
  ) =>
    defaultRender(ui, {
      wrapper: providers,
      ...options,
    })
}



// const mockedRouter: NextRouter = {
//   basePath: '',
//   pathname: '/',
//   route: '/',
//   asPath: '/',
//   query: {},
//   isLocaleDomain: true,
//   isPreview: false,
//   isReady: false,
//   push: vi.fn(async () => Promise.resolve(true)),
//   replace: vi.fn(async () => Promise.resolve(true)),
//   reload: vi.fn(async () => Promise.resolve(true)),
//   back: vi.fn(async () => Promise.resolve(true)),
//   prefetch: vi.fn(async () => Promise.resolve()),
//   beforePopState: vi.fn(async () => Promise.resolve(true)),
//   events: {
//     on: vi.fn(),
//     off: vi.fn(),
//     emit: vi.fn(),
//   },
//   isFallback: false,
// }



// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
type RenderUI = DefaultRenderParams[0]
type RenderOptions = DefaultRenderParams[1] & { url?: Url }

export function renderWithNextRouter (
  ui: RenderUI,
  { url, ...options }: RenderOptions = {},
) {
  const wrapper = ({ children }) => (
    <MemoryRouterProvider url={url}>
      {children}
    </MemoryRouterProvider>
  )

  return defaultRender(ui, { wrapper, ...options })
}




export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'


export { customRender as render }
export { mockRouter }
