import { Footer } from "../componentes/Footer";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import logoSinFondo from "../img/logo_sin_fondo.png";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Estado para guardar los errores de validación
    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.body.classList.add('login-register-body');

        return () => {
            document.body.classList.remove('login-register-body');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene la recarga de la página


        const newErrors = {};
        s
        if (!email) {
            newErrors.email = "El correo es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(email)) { // Validación simple de email
            newErrors.email = "El formato del correo no es válido";
        }

        if (!password) {
            newErrors.password = "La contraseña es obligatoria";
        }

        setErrors(newErrors);

        // "iniciar sesión"
        if (Object.keys(newErrors).length === 0) {
            console.log("Iniciando sesión con:", { email, password });
            // Aquí iría la lógica de fetch() para enviar los datos al backend
        }
    };
    return (
        <>

            <main className="login-contenedor">
                <form className="login-form" onSubmit={handleSubmit} noValidate>

                    <Link to="/">
                        <img src={logoSinFondo} alt="Logo de la Tienda" className="login-logo" />
                    </Link>

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email} // Controlado por el estado
                            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                            className={errors.email ? 'invalid' : ''} // Añade clase 'invalid' si hay error
                        />
                        <small
                            className="form-error"
                            style={{ display: errors.email ? 'block' : 'none' }}
                        >
                            {errors.email}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password} // Controlado por el estado
                            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                            className={errors.password ? 'invalid' : ''}
                        />
                        <small
                            className="form-error"
                            style={{ display: errors.password ? 'block' : 'none' }}
                        >
                            {errors.password}
                        </small>

                        <div className="form-ayuda-contenedor">
                            <small className="form-ayuda"><Link to="/register">Crear cuenta</Link></small>
                            <small className="form-ayuda"><a href="#">Recuperar contraseña</a></small>
                        </div>
                    </div>

                    <button type="submit">Iniciar Sesión</button>

                </form>
            </main>

            <Footer />
        </>
    );
}
