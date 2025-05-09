import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/FoundationDetail.css";
import { useEffect, useState } from "react";
import { Animal } from "../types/animal";
import { animalService } from "../services/animalService";
import { foundationService } from "../services/foundationService";
import { Foundation } from "../types/foundation";
import ContactModal from "../components/ContactModal";
import AnimalCard from "../components/AnimalCard";
import AnimalDetailModal from "../components/AnimalDetailModal";

export default function FoundationDetail() {
  const { id } = useParams();
  const [foundation, setFoundation] = useState<Foundation | null>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingFoundation, setLoadingFoundation] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    setLoadingFoundation(true);
    foundationService.getFoundationById(Number(id)).then((f) => {
      setFoundation(f || null);
      setLoadingFoundation(false);
    });
    setLoading(true);
    animalService.getAnimalesPorFundacion(Number(id)).then((data) => {
      setAnimals(data);
      setLoading(false);
    });
  }, [id]);

  if (loadingFoundation) {
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

  if (!foundation) {
    return (
      <div className="page-container">
        <Header />
        <main>
          <div className="container">
            <h2>Fundación no encontrada</h2>
            <Link to="/foundations" className="button primary">Volver a Fundaciones</Link>
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
        <section className="foundation-detail-hero">
          <div className="container">
            <div className="foundation-detail-header">
              <img src={foundation.logo} alt={foundation.name} className="foundation-logo" />
              <div>
                <h1>{foundation.name}</h1>
                <span className="tag">{foundation.city}</span>
                <p>{foundation.description}</p>
                <button className="button secondary" onClick={() => setOpenModal(true)}>Contactar</button>
              </div>
            </div>
          </div>
        </section>

        <section className="foundation-animals-list">
          <div className="container">
            <div className="section-header">
              <h2>Animales de esta fundación</h2>
            </div>
            <div className="card-grid four-columns">
              {loading ? (
                <p>Cargando animales...</p>
              ) : animals.length === 0 ? (
                <p>No hay animales registrados para esta fundación.</p>
              ) : (
                animals.map((i: Animal) => (
                  <AnimalCard key={i.id} animal={{ ...i, fundacionId: i.fundacionId ?? 0 }} onSelect={() => setSelectedAnimal(i)} />
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {openModal && foundation && (
        <ContactModal
          socialMedia={foundation.contact}
          email={foundation.email}
          name={foundation.name}
          onClose={() => setOpenModal(false)}
        />
      )}
      {selectedAnimal && (
        <AnimalDetailModal
          isOpen={true}
          onClose={() => setSelectedAnimal(null)}
          animalId={selectedAnimal.id}
          fromUrl={true}
        />
      )}
    </div>
  );
} 