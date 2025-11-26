import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductCard } from '../componentes/ProductCard.jsx'
import { CartProvider } from '../context/CartContext.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'

function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>{ui}</CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('ProductCard', () => {
  const producto = {
    id: 1,
    nombre: 'Amigurumi Gato',
    precio: 12990,
    stock: 5,
    imagenUrl: 'gato.png',
    categoria: { nombre: 'Peluches' }
  }

  it('muestra nombre, precio formateado y botón activo', () => {
    renderWithProviders(<ProductCard producto={producto} />)
    expect(screen.getByRole('heading', { name: producto.nombre })).toBeVisible()
    expect(screen.getByText('$12.990')).toBeVisible()
    expect(screen.getByRole('button', { name: /añadir al carro/i })).toBeEnabled()
  })
})