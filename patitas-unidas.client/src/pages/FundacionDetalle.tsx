import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Fundaciones.css";
import { useEffect, useState } from "react";
import { Animal } from "../types/animal";
import { animalService } from "../services/animalService";
import { fundacionService } from "../services/fundacionService";
import { Fundacion } from "../types/fundacion";

export default function FundacionDetalle() {
  const { id } = useParams();
  const [fundacion, setFundacion] = useState<Fundacion | null>(null);
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingFundacion, setLoadingFundacion] = useState(true);

  useEffect(() => {
    setLoadingFundacion(true);
    fundacionService.getFundacionById(Number(id)).then((f) => {
      setFundacion(f || null);
      setLoadingFundacion(false);
    });
    setLoading(true);
    animalService.getAnimalesPorFundacion(Number(id)).then((data) => {
      setAnimales(data);
      setLoading(false);
    });
  }, [id]);

  if (loadingFundacion) {
    return (
      <div className="page-container">
        <Header />
        <main>
          <div className="container">
            <p>Cargando fundación...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!fundacion) {
    return (
      <div className="page-container">
        <Header />
        <main>
          <div className="container">
            <h2>Fundación no encontrada</h2>
            <Link to="/fundaciones" className="button primary">Volver a Fundaciones</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <main>
        <section className="fundacion-detalle-hero">
          <div className="container">
            <div className="fundacion-detalle-header">
              <img src={fundacion.logo} alt={fundacion.nombre} className="fundacion-logo" />
              <div>
                <h1>{fundacion.nombre}</h1>
                <span className="tag">{fundacion.ciudad}</span>
                <p>{fundacion.descripcion}</p>
                <a href={`mailto:${fundacion.contacto}`} className="button secondary">Contactar</a>
              </div>
            </div>
          </div>
        </section>

        <section className="fundacion-animales-list">
          <div className="container">
            <div className="section-header">
              <h2>Animales de esta fundación</h2>
            </div>
            <div className="card-grid four-columns">
              {loading ? (
                <p>Cargando animales...</p>
              ) : animales.length === 0 ? (
                <p>No hay animales registrados para esta fundación.</p>
              ) : (
                animales.map((i: Animal) => (
                  <div className="card animal-card" key={i.id}>
                    <div className="card-image">
                      <img src={i.image} alt={`Animal ${i.name}`} />
                      <span className="badge">{i.type}</span>
                      {i.state === "Urgente" && <span className="badge urgent">Urgente</span>}
                    </div>
                    <div className="card-content">
                      <div className="card-header">
                        <h3>{i.name}</h3>
                        <span className={`tag ${i.age === "Adulto" ? "tag-warning" : "tag-success"}`}>{i.age}</span>
                      </div>
                      {i.tag && <span className="tag tag-small">{i.tag}</span>}
                      <p>{i.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 