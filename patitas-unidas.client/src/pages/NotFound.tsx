import { Link } from "react-router-dom"
import "/src/styles/NotFound.css"

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <i className="icon-paw"></i>
        <h1>¡Ups! Página no encontrada</h1>
        <p>
          Parece que esta página se ha perdido, igual que muchos de nuestros amigos peludos. ¡Ayúdanos a encontrarlos!
        </p>
        <Link to="/" className="button primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
