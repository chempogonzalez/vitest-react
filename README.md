# 🧪 vitest-react [![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

<img src="https://img.shields.io/npm/v/vitest-react?style=for-the-badge" />

> Auto setup project to use Vitest with TypeScript + test-utils


## 🔖 Description
Tool to auto initialize vitest config for react/nextjs projects. Allow to use common test utils methods.


## 📦 Installation
```zsh
# Install the package
$ npm install -D vitest-react
```

## 🚀 Usage
Just install the package and it will automatically create a vitest config file in your project root if needed.

Also you have some common test utils methods available:
```ts
/**
 * You can import some pre-setup common methods in your test files.
 */
import {
  render,
  renderWithNextRouter, // mocked next router
  renderWithProviders,  // wrap component in providers
  userEvent,            // all from @testing-library/user-event
  
  // All the @testing-library/react ones
  screen,
  waitFor,
  // ...
}


/**
 * You can also use methods from
 * @testing-library/jest-dom automatically
 */
  expect(element).toHaveClass('example-class')
  expect(element).toBeVisible()
  // ...
```

## 🤓 Happy Code

> Created with Typescript! ⚡ and latin music 🎺🎵
