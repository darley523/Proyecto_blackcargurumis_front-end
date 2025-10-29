import { Footer } from "../componentes/Footer";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Estado para guardar los errores de validación del formulario
    const [errors, setErrors] = useState({});

    // Estado para errores que vienen del backend (ej. "contraseña incorrecta")
    const [serverError, setServerError] = useState(null); 
    // Estado para saber si la petición está en curso
    const [loading, setLoading] = useState(false); 
    // Obtiene la función de login del contexto
    const { loginAction } = useAuth();
    // Hook para navegar
    const navigate = useNavigate(); 

    useEffect(() => {
        document.body.classList.add('login-register-body');
        return () => {
            document.body.classList.remove('login-register-body');
        };
    }, []);

    // Se convierte la función a 'async' para poder usar 'await'
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene la recarga de la página
        
        // Limpia errores anteriores
        setServerError(null);
        setErrors({});
        // Validación básica del formulario
        const newErrors = {};
        if (!email) {
            newErrors.email = "El correo es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "El formato del correo no es válido";
        }
        if (!password) {
            newErrors.password = "La contraseña es obligatoria";
        }
        setErrors(newErrors);

        // Si no hay errores de validación, se procede a llamar al backend
        if (Object.keys(newErrors).length === 0) {
            
            setLoading(true); // Empieza la carga

            try {
                // --- LÓGICA DE FETCH ---
                const response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, password: password }),
                });

                // Si el backend responde con un error (ej. 401 No Autorizado)
                if (!response.ok) {
                    let errorText = "Email o contraseña incorrectos";
                    
                    try {
                        const errorData = await response.json();
                        errorText = errorData.message || errorText;
                    } catch (e) {
                    console.warn("Respuesta de error del servidor sin JSON. Usando mensaje por defecto.");   
                    }

                    throw new Error(errorText);
                }

                // Si la respuesta es exitosa (ej. 200 OK)
                const data = await response.json(); //

                // Llama a la acción de login del contexto con el token recibido
                loginAction(data.token);

                // Informa al usuario que ha iniciado sesión correctamente
                alert('Inicio de sesión exitoso');

                // Redirige al usuario a la página principal
                navigate('/');

            } catch (error) {
                // Muestra el error del backend (ej. "Email o contraseña incorrectos")
                setServerError(error.message);
            } finally {
                // Termina la carga, independientemente del resultado
                setLoading(false);
            }
        }
    };

    return (
        <>
            <main className="login-contenedor">
                {/* Limpia los espacios invisibles del 'form' original */}
                <form className="login-form" onSubmit={handleSubmit} noValidate>

                    <Link to="/">
                        <img src="/img/logo_sin_fondo.png" alt="Logo de la Tienda" className="login-logo" />
                    </Link>

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'invalid' : ''}
                            disabled={loading} // Deshabilita el input mientras carga
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? 'invalid' : ''}
                            disabled={loading} // Deshabilita el input mientras carga
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

                    {/* --- MUESTRA EL ERROR DEL SERVIDOR --- */}
                    <small
                        className="form-error"
                        style={{ display: serverError ? 'block' : 'none', textAlign: 'center' }}
                    >
                        {serverError}
                    </small>

                    {/* Deshabilita el botón y cambia el texto mientras carga */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </button>

                </form>
            </main>

            <Footer />
        </>
    );
}