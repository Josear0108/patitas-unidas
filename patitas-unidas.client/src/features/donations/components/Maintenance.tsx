import { Link } from "react-router-dom"
import "@/components/errors/NotFound.css"

export default function Maintenance() {
  return (
    <div className="not-found" style={{ position: 'relative' }}>
      <div className="not-found-content">
        <i className="icon-paw"></i>
        <h1>¡Estamos mejorando esta sección!</h1>
        <p>
          Pronto podrás ayudar a más peluditos y fundaciones desde aquí. Mientras tanto, sigue explorando y cambiando vidas.
        </p>
        <Link to="/patitas-unidas" className="button primary">
          Volver al inicio
        </Link>
      </div>
      <div className="paw-prints">
        <span className="icon-paw paw-print"></span>
        <span className="icon-paw paw-print"></span>
        <span className="icon-paw paw-print"></span>
        <span className="icon-paw paw-print"></span>
      </div>
    </div>
  )
} 