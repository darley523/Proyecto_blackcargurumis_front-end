import { Navbar } from "../componentes/Navbar";
import { Footer } from "../componentes/Footer";
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { ProductCard } from '../componentes/ProductCard';

export function Productos() {
    const [searchParams] = useSearchParams();
    const categoriaURL = searchParams.get('categoria');

    // Estados para los datos del backend ---
    const [productos, setProductos] = useState([]); // <-- Aquí se guardarán los productos de la API
    const [cargando, setCargando] = useState(true);

    const [categoria, setCategoria] = useState(categoriaURL || 'todas');
    const [orden, setOrden] = useState('defecto');

    // Sincroniza el estado 'categoria' con la URL
    useEffect(() => {
        setCategoria(categoriaURL || 'todas');
    }, [categoriaURL]);

    // useEffect para llamar a la API ---
    useEffect(() => {
        const fetchProductos = async () => {
            setCargando(true);
            try {
                // Llama al endpoint del backend
                const response = await fetch('http://localhost:8080/api/productos');
                if (!response.ok) {
                    throw new Error('Error al cargar productos');
                }
                const data = await response.json();
                setProductos(data); // <-- Guarda los productos en el estado
            } catch (error) {
                console.error(error);
            } finally {
                setCargando(false);
            }
        };

        fetchProductos();
    }, []); // El array vacío [] hace que se ejecute solo una vez (al cargar)


    const productosFiltradosYOrdenados = useMemo(() => {
        let productosVisibles = [...productos]; 

        // filtrar por categoría
        if (categoria !== 'todas') {
            productosVisibles = productosVisibles.filter(p => p.categoria.nombre.toLowerCase() === categoria);
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
    }, [categoria, orden, productos]);

    // Muestra un estado de carga ---
    if (cargando) {
        return (
            <div>
                <Navbar />
                <main>
                    <div className="cargando-contenedor">Cargando productos...</div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
                <main>
                    {/* --- Sección de Filtros  --- */}
                    <section className="filtros-contenedor">
                        <div className="filtro">
                            <label htmlFor="categoria-filtro">Filtrar por categoría:</label>
                            <select
                                id="categoria-filtro"
                                name="categoria"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
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
                                value={orden}
                                onChange={(e) => setOrden(e.target.value)}
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