import instagramLogo from '../img/instagram_logo.svg';

export function Footer() {
  return (
    <div className="footer-content">
      <a href="https://www.instagram.com/blackcatgurumis/" target="_blank" rel="noopener noreferrer">
        <img src={instagramLogo} alt="instagram" className="instagram-logo" /> Síguenos en Instagram
      </a>
      <p>&copy; 2025 Tienda Blackcatgurumis. Todos los derechos reservados.</p>
    </div>
  );
}
