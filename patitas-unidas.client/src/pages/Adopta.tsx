import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { animalService } from "../services/animalService";
import { AnimalData } from "../types/animal";
import AnimalCard from "../components/Animal-card";

export default function Adopta() {
  const [animals, setAnimals] = useState<AnimalData[]>([]);

  useEffect(() => {
    animalService.getAnimals().then((data) => {
      setAnimals(data);
    });
  }, []);

  return (
    <div className="page-container">
      <Header />
      <main>
        <section className="adopta-hero">
          <div className="container">
            <div className="section-header">
              <h1>Encuentra a tu compañero ideal</h1>
              <p>
                Todos estos animales están esperando una segunda oportunidad.
                Filtra según tus preferencias y encuentra el compañero perfecto
                para tu hogar.
              </p>
            </div>

            <div className="search-container">
              <form className="search-form">
                <div className="form-row">
                  <div className="form-group search-input">
                    <i className="icon-search"></i>
                    <input
                      type="text"
                      placeholder="Ej: cachorro, juguetón, tranquilo..."
                      aria-label="Buscar por nombre o características"
                    />
                  </div>
                  <div className="form-group">
                    <select aria-label="Tipo de animal">
                      <option value="todos">Todos los animales</option>
                      <option value="perros">Perros</option>
                      <option value="gatos">Gatos</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select aria-label="Ubicación">
                      <option value="todas">Todas las ubicaciones</option>
                      <option value="bogota">Bogotá</option>
                      <option value="medellin">Medellín</option>
                      <option value="cali">Cali</option>
                      <option value="barranquilla">Barranquilla</option>
                    </select>
                  </div>
                  <button type="submit" className="button primary">
                    <i className="icon-search"></i> Buscar
                  </button>
                </div>
                <div className="advanced-filters">
                  <button type="button" className="button text small">
                    <i className="icon-filter"></i> Filtros avanzados
                    <i className="icon-chevron-down"></i>
                  </button>
                </div>
              </form>
            </div>

            <div className="animals-grid">
              {animals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>

            <div className="load-more">
              <button className="button secondary">Cargar más animales</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
