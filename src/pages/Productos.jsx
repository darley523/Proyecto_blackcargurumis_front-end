import { Navbar } from "../componentes/Navbar";
import { Footer } from "../componentes/Footer";
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom'; // Para leer la URL
import { productData } from '../data/productData';
import { ProductCard } from '../componentes/ProductCard';

export function Productos() {
    const [searchParams] = useSearchParams();
    const categoriaURL = searchParams.get('categoria');

    const [categoria, setCategoria] = useState(categoriaURL || 'todas');
    const [orden, setOrden] = useState('defecto');

    useEffect(() => {
        setCategoria(categoriaURL || 'todas');
    }, [categoriaURL]);

    const productosFiltradosYOrdenados = useMemo(() => {
        let productosVisibles = [...productData];

        // filtrar por categoría
        if (categoria !== 'todas') {
            productosVisibles = productosVisibles.filter(p => p.categoria === categoria);
        }

        // ordenar
        productosVisibles.sort((a, b) => {
            const nombreA = a.nombre.toLowerCase();
            const nombreB = b.nombre.toLowerCase();
            if (orden === 'az') return nombreA.localeCompare(nombreB);
            if (orden === 'za') return nombreB.localeCompare(nombreA);
            return 0; // 'defecto'
        });

        return productosVisibles;
    }, [categoria, orden, productData]);

    return (
        <div>
            <Navbar />
                <main>
                    {/* --- Sección de Filtros --- */}
                    <section className="filtros-contenedor">
                        <div className="filtro">
                            <label htmlFor="categoria-filtro">Filtrar por categoría:</label>
                            <select
                                id="categoria-filtro"
                                name="categoria"
                                value={categoria} // El valor está "controlado" por el estado
                                onChange={(e) => setCategoria(e.target.value)} // Al cambiar, actualiza el estado
                            >
                                <option value="todas">Todas</option>
                                <option value="amigurumis">Amigurumis</option>
                                <option value="ropa">Ropa</option>
                                <option value="tejidos">Tejidos</option>
                                <option value="bolsos">Carteras/Bolsos</option>
                            </select>
                        </div>
                        <div className="filtro">
                            <label htmlFor="orden-filtro">Ordenar por:</label>
                            <select
                                id="orden-filtro"
                                name="orden"
                                value={orden} // El valor está "controlado" por el estado
                                onChange={(e) => setOrden(e.target.value)} // Al cambiar, actualiza el estado
                            >
                                <option value="defecto">Por defecto</option>
                                <option value="az">Alfabéticamente, A-Z</option>
                                <option value="za">Alfabéticamente, Z-A</option>
                            </select>
                        </div>
                    </section>

                    {/* --- Sección de Lista de Productos --- */}
                    <section>
                        <div className="Productos-contenedor">
                            {productosFiltradosYOrdenados.map(producto => (
                                <ProductCard key={producto.id} producto={producto} />
                            ))}
                        </div>
                    </section>
                </main>
                <Footer />
        </div>
    );
}