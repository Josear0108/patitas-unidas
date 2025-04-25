"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : ""
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <i className="icon-paw"></i>
            <span>Patitas Unidas</span>
          </Link>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger ${menuOpen ? "open" : ""}`}></span>
          </button>

          <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
            <ul className="nav-links">
              <li>
                <Link to="/patitas-unidas" className={isActive("/")} onClick={closeMenu}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/adopta" className={isActive("/adopta")} onClick={closeMenu}>
                  Adopta
                </Link>
              </li>
              <li>
                <Link to="/dona" className={isActive("/dona")} onClick={closeMenu}>
                  Dona
                </Link>
              </li>
              <li>
                <Link to="/voluntario" className={isActive("/voluntario")} onClick={closeMenu}>
                  Sé Voluntario
                </Link>
              </li>
            </ul>
            <div className="nav-buttons">
              <button className="button text">Iniciar Sesión</button>
              <button className="button primary">Registrarse</button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
