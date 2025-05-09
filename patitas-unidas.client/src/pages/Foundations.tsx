import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Foundations.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { foundationService } from "../services/foundationService";
import { Foundation } from "../types/foundation";
import ContactModal from "../components/ContactModal";

export default function FoundationList() {
  const [foundation, setFoundation] = useState<Foundation[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState<null | Foundation>(null);

  useEffect(() => {
    setLoading(true);
    foundationService.getFoundations().then((data) => {
      setFoundation(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="page-container">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="foundation-hero">
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
        <section className="foundation-list">
          <div className="container">
            <div className="card-grid three-columns">
              {loading ? (
                <p>Cargando fundaciones...</p>
              ) : foundation.length === 0 ? (
                <p>No hay fundaciones registradas.</p>
              ) : (
                foundation.map((f) => (
                  <div className="card foundation-card" key={f.id}>
                    <div className="card-image">
                      <img src={f.logo} alt={`Logo de ${f.name}`} />
                    </div>
                    <div className="card-content">
                      <h3>{f.name}</h3>
                      <span className="tag">{f.city}</span>
                      <p>{f.description}</p>
                      <button className="button secondary full" onClick={() => setOpenModal(f)}>Contactar</button>
                      <Link to={`/foundations/${f.id}`} className="button primary full" style={{marginTop: '0.5rem'}}>Ver más</Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Formulario para nuevas fundaciones */}
        <section className="foundation-contact">
          <div className="container">
            <div className="form-container">
              <h2>¿Tu fundación quiere unirse?</h2>
              <p>Completa el formulario y nos pondremos en contacto contigo.</p>
              <form className="foundation-form">
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
      {openModal && (
        <ContactModal
          socialMedia={openModal.contact}
          email={openModal.email}
          name={openModal.name}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
} 