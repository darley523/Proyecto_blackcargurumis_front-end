import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from "../componentes/Footer";
import { useAuth } from "../context/AuthContext"; // Importa el hook de autenticación

export function Register() {
    // Un solo estado para todos los campos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
        telefono: '',
        rut: ''
    });

    // Estado para los errores
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Obtiene la acción de login desde el contexto
    const { loginAction } = useAuth(); 

    // Efecto para la clase del <body> 
    useEffect(() => {
        document.body.classList.add('login-register-body');
        return () => {
            document.body.classList.remove('login-register-body');
        };
    }, []);

    // Manejador de cambios para todos los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    function validarFormatoRut(rut) {
        if (!rut || typeof rut !== 'string') return false;
        const rutLimpio = rut.replace(/\./g, '');
        const formatoValido = /^(\d{7,8})-([\dKk])$/;
        return formatoValido.test(rutLimpio);
    }

    // Función de envío y validación
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setServerError(null);

        const newErrors = {};
        const { nombre, email, password, confirmPassword, telefono, rut } = formData;

        // --- Validación del cliente ---
        if (!nombre) newErrors.nombre = "El nombre es obligatorio";
        if (!email) newErrors.email = "El correo es obligatorio";
        if (!password) {
            newErrors.password = "La contraseña es obligatoria";
        } else if (password.length < 8) {
            newErrors.password = "Debe tener al menos 8 caracteres";
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        }
        if (!telefono) newErrors.telefono = "El teléfono es obligatorio";
        if (!rut) {
            newErrors.rut = "El RUT es obligatorio";
        } else if (!validarFormatoRut(rut)) {
            newErrors.rut = "El formato del RUT no es válido (Ej: 12345678-9)";
        }
        
        setErrors(newErrors);

        // Si no hay errores, enviar al backend
        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre: formData.nombre,
                        email: formData.email,
                        password: formData.password,
                        telefono: formData.telefono,
                        rut: formData.rut
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al registrar. El email o RUT ya pueden estar en uso.');
                }

                // Si el registro es exitoso, usa la acción del contexto
                const data = await response.json();
                loginAction(data.token);
                
                alert('Registro exitoso');
                navigate('/'); // Redirige a la página principal

            } catch (error) {
                setServerError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <main className="login-contenedor">
                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    <Link to="/">
                        <img src="/img/logo_sin_fondo.png" alt="Logo de la Tienda" className="login-logo" />
                    </Link>

                    {/* --- Campo Nombre --- */}
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Completo</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            required
                            placeholder="Ej: Ana Torres"
                            value={formData.nombre}
                            onChange={handleChange}
                            className={errors.nombre ? 'invalid' : ''}
                            disabled={loading}
                        />
                        <small className="form-error" style={{ display: errors.nombre ? 'block' : 'none' }}>
                            {errors.nombre}
                        </small>
                    </div>

                    {/* --- Campo Email --- */}
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="Ej: ana.torres@correo.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'invalid' : ''}
                            disabled={loading}
                        />
                        <small className="form-error" style={{ display: errors.email ? 'block' : 'none' }}>
                            {errors.email}
                        </small>
                    </div>

                    {/* --- Campo Contraseña --- */}
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="8+ caracteres"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'invalid' : ''}
                            disabled={loading}
                        />
                        <small className="form-error" style={{ display: errors.password ? 'block' : 'none' }}>
                            {errors.password}
                        </small>
                    </div>

                    {/* --- Campo Confirmar Contraseña --- */}
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            required
                            placeholder="Repite tu contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'invalid' : ''}
                            disabled={loading}
                        />
                        <small className="form-error" style={{ display: errors.confirmPassword ? 'block' : 'none' }}>
                            {errors.confirmPassword}
                        </small>
                    </div>

                    {/* --- Campo Teléfono --- */}
                    <div className="form-group">
                        <label htmlFor="telefono">Número de Teléfono</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            required
                            placeholder="Ej: 912345678"
                            value={formData.telefono}
                            onChange={handleChange}
                            className={errors.telefono ? 'invalid' : ''}
                            disabled={loading}
                        />
                        <small className="form-error" style={{ display: errors.telefono ? 'block' : 'none' }}>
                            {errors.telefono}
                        </small>
                    </div>

                    {/* --- Campo RUT --- */}
                    <div className="form-group">
                        <label htmlFor="rut">RUT</label>
                        <input
                            type="text"
                            id="rut"
                            name="rut"
                            required
                            placeholder="Ej: 12345678-9"
                            value={formData.rut}
                            onChange={handleChange}
                            className={errors.rut ? 'invalid' : ''}
                            disabled={loading}
                        />
                        <small className="form-error" style={{ display: errors.rut ? 'block' : 'none' }}>
                            {errors.rut}
                        </small>

                        <div className="form-ayuda-contenedor-register">
                            <small className="form-ayuda"><Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link></small>
                        </div>
                    </div>

                    {/* Muestra errores del servidor */}
                    <small
                        className="form-error"
                        style={{ display: serverError ? 'block' : 'none', textAlign: 'center' }}
                    >
                        {serverError}
                    </small>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>

                </form>
            </main>
            <Footer />
        </>
    );
}