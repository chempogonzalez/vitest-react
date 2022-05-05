import '@testing-library/jest-dom'
import { vi } from 'vitest'



vi.mock('next/router', () => require('next-router-mock'))
vi.mock('next/dist/client/router', () => require('next-router-mock'))
