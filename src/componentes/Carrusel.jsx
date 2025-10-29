import React, { useState, useEffect } from 'react';
const imagenes = [
  '/img/carrusel.jpg',
  '/img/carrusel2.jpg'
];

export function Carrusel() {
  const [indice, setIndice] = useState(0);

  const cambiarImagen = (n) => {
    setIndice(prevIndice => {
      let nuevoIndice = prevIndice + n;
      if (nuevoIndice >= imagenes.length) return 0;
      if (nuevoIndice < 0) return imagenes.length - 1;
      return nuevoIndice;
    });
  };

  useEffect(() => {
    const carruselIntervalo = setInterval(() => {
      cambiarImagen(1);
    }, 3500);
    
    // Función de limpieza para evitar errores
    return () => clearInterval(carruselIntervalo);
  }, []); // El [] asegura que solo se ejecute una vez

  
  return (
    <section className="Carrusel">
      <div className="Carrusel-contenedor">
        {imagenes.map((imgSrc, i) => (
          <img
            key={i}
            src={imgSrc}
            alt={`Producto ${i + 1}`}
            // Lógica para mostrar/ocultar la imagen
            style={{ display: i === indice ? 'block' : 'none' }}
          />
        ))}
      </div>
      <button className="carrusel-btn carrusel-btn-prev" onClick={() => cambiarImagen(-1)}>&#10094;</button>
      <button className="carrusel-btn carrusel-btn-next" onClick={() => cambiarImagen(1)}>&#10095;</button>
    </section>
  );
}