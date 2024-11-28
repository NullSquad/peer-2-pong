import { h } from 'preact';
import './Header.css'; // Archivo CSS con los estilos
import avatar from "../../img/avatar.png"; // Imagen para el avatar

export function Header() {
  return (
    <header className="header">
      <nav>
        {/* Contenedor para la imagen y el eslogan */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img className='avatar' src={avatar} alt='avatar' />
          <h2 className='slogan'>Ncastell</h2>
        </div>
      </nav>
    </header>
  );
}
