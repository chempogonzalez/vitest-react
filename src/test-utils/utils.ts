/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/export */
import { render } from '@testing-library/react'

import type { RenderOptions } from '@testing-library/react'


/**
 * TODO: To be extended with custom common providers
 */
function customRender (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  })
}

function renderWithProviders (
  providers: React.JSXElementConstructor<{children: React.ReactElement}>,
) {
  return (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
  ) =>
    render(ui, {
      wrapper: providers,
      ...options,
    })
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

export { renderWithProviders }

export { customRender as render }
