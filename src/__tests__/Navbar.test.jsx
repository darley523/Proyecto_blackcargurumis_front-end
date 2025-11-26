import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from '../componentes/Navbar.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'

// Helper para renderizar con contexto y router
function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  )
}

describe('Navbar', () => {
  it('muestra enlace Login cuando no hay usuario', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByRole('link', { name: /login/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /inicio/i })).toBeVisible()
  })
})