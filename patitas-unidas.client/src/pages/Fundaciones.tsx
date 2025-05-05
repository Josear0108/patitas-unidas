import Header from "../components/Header";
import Footer from "../components/Footer";
import "/src/styles/Fundaciones.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fundacionService } from "../services/fundacionService";
import { Fundacion } from "../types/fundacion";

export default function Fundaciones() {
  const [fundaciones, setFundaciones] = useState<Fundacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fundacionService.getFundaciones().then((data) => {
      setFundaciones(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="page-container">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="fundaciones-hero">
          <div className="container">
            <div className="section-header">
              <h1>Fundaciones aliadas</h1>
              <p>
                Conoce las fundaciones que trabajan día a día por el bienestar animal. Puedes contactarlas, apoyarlas o postular tu fundación para unirte a la red.
              </p>
            </div>
          </div>
        </section>

        {/* Listado de Fundaciones */}
        <section className="fundaciones-list">
          <div className="container">
            <div className="card-grid three-columns">
              {loading ? (
                <p>Cargando fundaciones...</p>
              ) : fundaciones.length === 0 ? (
                <p>No hay fundaciones registradas.</p>
              ) : (
                fundaciones.map((f) => (
                  <div className="card fundacion-card" key={f.id}>
                    <div className="card-image">
                      <img src={f.logo} alt={`Logo de ${f.nombre}`} />
                    </div>
                    <div className="card-content">
                      <h3>{f.nombre}</h3>
                      <span className="tag">{f.ciudad}</span>
                      <p>{f.descripcion}</p>
                      <a href={`mailto:${f.contacto}`} className="button secondary full">Contactar</a>
                      <Link to={`/fundaciones/${f.id}`} className="button primary full" style={{marginTop: '0.5rem'}}>Ver más</Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Formulario para nuevas fundaciones */}
        <section className="fundaciones-contact">
          <div className="container">
            <div className="form-container">
              <h2>¿Tu fundación quiere unirse?</h2>
              <p>Completa el formulario y nos pondremos en contacto contigo.</p>
              <form className="fundacion-form">
                <div className="form-group">
                  <input type="text" placeholder="Nombre de la fundación" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Correo de contacto" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Ciudad" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Cuéntanos sobre tu labor" rows={4} required></textarea>
                </div>
                <button type="submit" className="button primary full">
                  Enviar solicitud
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 