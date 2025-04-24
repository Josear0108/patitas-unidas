import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Adopta() {

  const animals = [
    {
      id: 1,
      name: "Maximiliano",
      type: "Perro",
      state: "Urgente",
      tag: "Sociable",
      age: "Adulto",
      description: "Tranquila y mimosa, busca un hogar donde pueda recibir mucho amor.",
      image: "/src/assets/patita_1.jpg",
    },
    {
      id: 10,
      name: "Antonia",
      type: "Gato",
      state: "Urgente",
      tag: "Juguetón",
      age: "Adulto",
      description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
      image: "/src/assets/patita_10.jpg",
    },
    {
      id: 2,
      name: "Sasha",
      type: "Perro",
      state: "Nuevo",
      tag: "Juguetón",
      age: "Cachorro",
      description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
      image: "/src/assets/patita_2.jpg",
    },
    {
      id: 3,
      name: "Drax",
      type: "Perro",
      state: "Urgente",
      tag: "Tranquilo",
      age: "Cachorro",
      description: "Tranquila y mimosa, busca un hogar donde pueda recibir mucho amor.",
      image: "/src/assets/patita_3.jpg",
    },
    {
      id: 4,
      name: "Tobhias",
      type: "Perro",
      state: "Urgente",
      tag: "Tranquilo",
      age: "Adulto",
      description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
      image: "/src/assets/patita_4.jpg",
    },
    {
      id: 5,
      name: "Blanca nieves",
      type: "Gato",
      state: "Nuevo",
      tag: "Independiente",
      age: "Adulto",
      description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
      image: "/src/assets/patita_5.jpg",
    },
    {
      id: 7,
      name: "Nina",
      type: "Gato",
      tag: "Tranquilo",
      age: "Cachorro",
      description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
      image: "/src/assets/patita_7.jpg",
    },
    {
      id: 8,
      name: "Blue",
      type: "Gato",
      tag: "Juguetón",
      age: "Adulto",
      description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
      image: "/src/assets/patita_8.jpg",
    },
    {
      id: 9,
      name: "Pelusa",
      type: "Perro",
      state: "Urgente",
      tag: "Juguetón",
      age: "Adulto",
      description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
      image: "/src/assets/patita_9.jpg",
    },
    {
      id: 6,
      name: "Francheska",
      type: "Gato",
      state: "Urgente",
      tag: "Independiente",
      age: "Cachorro",
      description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
      image: "/src/assets/patita_6.jpg",
    }
  ];

  return (
    <div className="page-container">
      <Header />
      <main>
        <section className="adopta-hero">
          <div className="container">
            <div className="section-header">
              <h1>Encuentra a tu compañero ideal</h1>
              <p>
                Todos estos animales están esperando una segunda oportunidad. Filtra según tus preferencias y encuentra
                el compañero perfecto para tu hogar.
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
              {animals.map((i) => (
                <div className="card animal-card" key={i.id}>
                  <div className="card-image">
                    <img src={`${i.image}?height=200&width=300`} alt={`Animal ${i}`} />
                    <span className="badge">{i.type}</span>
                    {i.state == "Urgente" && <span className="badge urgent">Urgente</span>}
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <h3>
                        {i.name}
                      </h3>
                      <span className={`tag ${i.age == "Adulto"? "tag-warning" : "tag-success"}`}>
                        {i.age}
                      </span>
                    </div>
                    <div className="tags">
                      <span className="tag tag-small">{i.tag}</span>
                    </div>
                    <p>
                      {i.description}
                    </p>
                    <Link to={`/adopta/${i}`} className="button primary full">
                      Conocer más
                    </Link>
                  </div>
                </div>
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
  )
}
