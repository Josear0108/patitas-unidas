import { Link } from "react-router-dom"
import "/src/styles/Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <div className="footer-logo">
              <i className="icon-paw"></i>
              <span>Patitas Unidas</span>
            </div>
            <p>Tecnología para cambiarle la vida a los animales callejeros.</p>
            <div className="social-links">
              <a
                href="https://instagram.com/patitasunidas_co"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="icon-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Enlaces rápidos</h3>
            <ul className="footer-links">
              <li>
                <Link to="/patitas-unidas">Inicio</Link>
              </li>
              <li>
                <Link to="/adopta">Adopta</Link>
              </li>
              <li>
                <Link to="/dona">Dona</Link>
              </li>
              <li>
                <Link to="/voluntario">Sé Voluntario</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Recursos</h3>
            <ul className="footer-links">
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/faq">Preguntas frecuentes</Link>
              </li>
              <li>
                <Link to="/terminos">Términos y condiciones</Link>
              </li>
              <li>
                <Link to="/privacidad">Política de privacidad</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contacto</h3>
            <ul className="contact-info">
              <li>
                <span>Email:</span>
                <a href="mailto:contacto.patitasunidas@gmail.com">contacto.patitasunidas@gmail.com</a>
              </li>
              <li>
                <span>Instagram:</span>
                <a href="https://instagram.com/patitasunidas_co" target="_blank" rel="noopener noreferrer">
                  @patitasunidas_co
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Patitas Unidas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
