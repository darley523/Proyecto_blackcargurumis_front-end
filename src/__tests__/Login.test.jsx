import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { Login } from '../pages/Login.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'

function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  )
}

describe('Login', () => {
  it('renderiza campos de correo y contraseña y botón enviar', () => {
    renderWithProviders(<Login />)
    expect(screen.getByLabelText(/correo electrónico/i)).toBeVisible()
    expect(screen.getByLabelText(/contraseña/i)).toBeVisible()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeEnabled()
  })
})