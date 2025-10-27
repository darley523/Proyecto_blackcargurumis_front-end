import { Navbar } from "../componentes/Navbar";
import { Footer } from "../componentes/Footer";
import { Carrusel } from "../componentes/Carrusel";


export function Principal() {
    return (
        <div>
            <Navbar />
            <Carrusel />
            <h1>Página Principal</h1>
            <Footer />
        </div>
    );
}