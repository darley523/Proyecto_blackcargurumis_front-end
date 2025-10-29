import { Navbar } from "../componentes/Navbar";
import { Footer } from "../componentes/Footer";
import { Carrusel } from "../componentes/Carrusel";
import { Link } from "react-router-dom";



export function Principal() {
    return (
        <>
            <Navbar />
            <main>
                <Carrusel />
                <section className="Categorias">
                    <h2>Categorías</h2>
                    <div className="Categorias-contenedor">
                        <div className="Categoria">
                            <p> Amigurumis </p>
                            <Link to="/productos?categoria=amigurumis">
                                <img src="/img/amigurumis.jpg" alt="Categoría 1" />
                            </Link>
                        </div>
                        <div className="Categoria">
                            <p> Ropa </p>
                            <Link to="/productos?categoria=ropa">
                                <img src="/img/ropa.jpg" alt="Categoría 2" />
                            </Link>
                        </div>
                        <div className="Categoria">
                            <p> Tejidos </p>
                            <Link to="/productos?categoria=tejidos">
                                <img src="/img/tejidos.jpg" alt="Categoría 3" />
                            </Link>
                        </div>
                        <div className="Categoria">
                            <p> Carteras/Bolsos </p>
                            <Link to="/productos?categoria=bolsos">
                                <img src="img/bolsos.jpg" alt="Categoría 4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}