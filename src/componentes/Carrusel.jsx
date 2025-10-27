import React, { useState, useEffect } from 'react';

// Las imágenes que usará el carrusel
const imagenes = [
  "/img/carrusel.jpg",
  "/img/carrusel2.jpg"
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

  // 3. Reemplazamos 'setInterval' con un "Efecto" de React
  useEffect(() => {
    const carruselIntervalo = setInterval(() => {
      cambiarImagen(1);
    }, 3500);
    
    // Función de limpieza para evitar errores
    return () => clearInterval(carruselIntervalo);
  }, []); // El [] asegura que solo se ejecute una vez

  // 4. El HTML se convierte en JSX dentro del return
  return (
    <section className="Carrusel"> {/* 'class' se vuelve 'className' */}
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
      {/* 'onclick' ahora llama a nuestra función de React */}
      <button className="carrusel-btn carrusel-btn-prev" onClick={() => cambiarImagen(-1)}>&#10094;</button>
      <button className="carrusel-btn carrusel-btn-next" onClick={() => cambiarImagen(1)}>&#10095;</button>
    </section>
  );
}