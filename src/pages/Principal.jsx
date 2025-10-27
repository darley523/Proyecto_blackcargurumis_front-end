import { Navbar } from "../componentes/Navbar";
import { Footer } from "../componentes/Footer";
import { Carrusel } from "../componentes/Carrusel";
import { Link } from "react-router-dom";
import amigurumisImg from "../img/amigurumis.jpg"; // Ya lo tenías
import ropaImg from "../img/ropa.jpg";
import tejidosImg from "../img/tejidos.jpg";
import bolsosImg from "../img/bolsos.jpg";



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
                                <img src={amigurumisImg} alt="Categoría 1" />
                            </Link>
                        </div>
                        <div className="Categoria">
                            <p> Ropa </p>
                            <Link to="/productos?categoria=ropa">
                                <img src={ropaImg} alt="Categoría 2" />
                            </Link>
                        </div>
                        <div className="Categoria">
                            <p> Tejidos </p>
                            <Link to="/productos?categoria=tejidos">
                                <img src={tejidosImg} alt="Categoría 3" />
                            </Link>
                        </div>
                        <div className="Categoria">
                            <p> Carteras/Bolsos </p>
                            <Link to="/productos?categoria=bolsos">
                                <img src={bolsosImg} alt="Categoría 4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}