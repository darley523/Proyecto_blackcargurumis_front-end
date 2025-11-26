// Extiende automáticamente los matchers para Vitest
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Limpia el DOM después de cada test para evitar duplicados
afterEach(() => {
	cleanup()
})
