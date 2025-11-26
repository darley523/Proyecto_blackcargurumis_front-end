import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Carrusel } from '../componentes/Carrusel.jsx'

describe('Carrusel', () => {
  it('muestra la primera imagen al inicio', () => {
    render(<Carrusel />)
    expect(screen.getByAltText('Producto 1')).toBeVisible()
    expect(screen.getByAltText('Producto 2')).not.toBeVisible()
  })

  it('avanza con el botón "Siguiente"', async () => {
    const user = userEvent.setup()
    render(<Carrusel />)
    await user.click(screen.getByRole('button', { name: 'Siguiente' }))
    expect(screen.getByAltText('Producto 1')).not.toBeVisible()
    expect(screen.getByAltText('Producto 2')).toBeVisible()
  })

  it('rota automáticamente cada 3.5s', async () => {
    render(<Carrusel />)
    await new Promise(res => setTimeout(res, 3600))
    expect(screen.getByAltText('Producto 2')).toBeVisible()
  }, 6000)
})
