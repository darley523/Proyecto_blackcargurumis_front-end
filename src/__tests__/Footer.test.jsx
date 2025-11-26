import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '../componentes/Footer.jsx'

describe('Footer', () => {
  it('muestra enlace a Instagram y texto de copyright', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /síguenos en instagram/i })
    expect(link).toHaveAttribute('href', 'https://www.instagram.com/blackcatgurumis/')
    expect(screen.getByText(/todos los derechos reservados/i)).toBeVisible()
  })
})