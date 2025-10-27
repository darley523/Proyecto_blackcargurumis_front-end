import { Navbar } from "../componentes/Navbar";
import { Footer } from "../componentes/Footer";

export function Admin() {
    return (
        <>
            <Navbar />
            <main>
                <h1>Panel de Administración</h1>
                <div className="admin-container">
                    <p>Bienvenido al panel de administración</p>
                </div>
            </main>
            <Footer />
        </>
    );
}