import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "/src/styles/home.css"

export default function Home() {
    const animals = [
      {
        id: 1,
        nombre: "Maximiliano",
        tipo: "Perro",
        edad: "Adulto",
        descripcion: "Tranquila y mimosa, busca un hogar donde pueda recibir mucho amor.",
        imagen: "/src/assets/patita_1.jpg",
      },
      {
        id: 2,
        nombre: "Francheska",
        tipo: "Gato",
        edad: "Cachorro",
        descripcion: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        imagen: "/src/assets/patita_6.jpg",
      },
      {
        id: 3,
        nombre: "Drax",
        tipo: "Perro",
        edad: "Cachorro",
        descripcion: "Tranquila y mimosa, busca un hogar donde pueda recibir mucho amor.",
        imagen: "/src/assets/patita_3.jpg",
      },
      {
        id: 4,
        nombre: "Antonia",
        tipo: "Gato",
        edad: "Adulto",
        descripcion: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        imagen: "/src/assets/patita_10.jpg",
      },
    ];

  return (
    <div className="page-container">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <span className="badge">Tecnología para el cambio animal</span>
              <h1>
                Cambiando vidas, una <span className="highlight">patita</span> a la vez
              </h1>
              <p>
                Conectamos personas, animales y fundaciones para darle una segunda oportunidad a los animales en
                situación de calle.
              </p>
              <div className="button-group">
                <Link to="/adopta" className="button primary">
                  Quiero Adoptar
                </Link>
                <Link to="/dona" className="button secondary">
                  Quiero Ayudar
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img src="../../src/assets/patita_1.jpg?height=500&width=500" alt="Perro y gato felices" />
            </div>
          </div>
        </section>

        {/* Problema y Solución */}
        <section className="problem-solution">
          <div className="container">
            <div className="section-header">
              <h2>El Problema y Nuestra Solución</h2>
              <p>
                Miles de animales sufren en las calles sin visibilidad ni recursos, mientras muchas personas quieren
                ayudar pero no saben cómo.
              </p>
            </div>

            <div className="card-grid two-columns">
              <div className="card problem-card">
                <div className="card-icon">
                  <i className="icon-paw"></i>
                </div>
                <h3>El Problema</h3>
                <ul className="feature-list">
                  <li>Miles de animales en situación de calle sufren sin visibilidad ni recursos.</li>
                  <li>Las fundaciones pequeñas no tienen herramientas digitales ni apoyo constante.</li>
                  <li>Muchos quieren ayudar, pero no saben cómo ni dónde hacerlo.</li>
                </ul>
              </div>

              <div className="card solution-card">
                <div className="card-icon">
                  <i className="icon-heart"></i>
                </div>
                <h3>Nuestra Solución</h3>
                <ul className="feature-list">
                  <li>Una plataforma colaborativa que conecta personas, animales y fundaciones.</li>
                  <li>Adopta: Encuentra a tu compañero ideal con filtros personalizados.</li>
                  <li>Dona: Apoya campañas urgentes o apadrina un animal específico.</li>
                  <li>Sé voluntario: Ayuda con tu tiempo, espacio o transporte.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Funcionalidades Principales */}
        <section className="features" id="adopta">
          <div className="container">
            <div className="section-header">
              <h2>¿Cómo puedes ayudar?</h2>
              <p>Nuestra plataforma ofrece múltiples formas de contribuir al bienestar animal.</p>
            </div>

            <div className="card-grid three-columns">
              <div className="card feature-card">
                <div className="card-icon">
                  <i className="icon-paw"></i>
                </div>
                <h3>Adopta</h3>
                <p>
                  Encuentra a tu compañero ideal con nuestro sistema de filtros personalizados según tu estilo de vida.
                </p>
                <Link to="/adopta" className="button text">
                  Ver Animales <i className="icon-arrow-right"></i>
                </Link>
              </div>

              <div className="card feature-card">
                <div className="card-icon">
                  <i className="icon-gift"></i>
                </div>
                <h3>Dona</h3>
                <p>
                  Apoya campañas urgentes o apadrina un animal específico. Todas las donaciones son transparentes y
                  rastreables.
                </p>
                <Link to="/dona" className="button text">
                  Hacer Donación <i className="icon-arrow-right"></i>
                </Link>
              </div>

              <div className="card feature-card">
                <div className="card-icon">
                  <i className="icon-users"></i>
                </div>
                <h3>Sé Voluntario</h3>
                <p>Ayuda con tu tiempo, espacio como hogar de paso o transporte para animales que lo necesitan.</p>
                <Link to="/voluntario" className="button text">
                  Registrarme <i className="icon-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Animales Destacados */}
        <section className="featured-animals">
          <div className="container">
            <div className="section-header with-action">
              <h2>Animales que buscan hogar</h2>
              <Link to="/adopta" className="button text">
                Ver todos <i className="icon-arrow-right"></i>
              </Link>
            </div>

            <div className="card-grid four-columns">
              {animals.map((i) => (
                <div className="card animal-card" key={i.id}>
                  <div className="card-image">
                    <img src={`${i.imagen}??height=200&width=300`} alt={`Animal ${i}`} />
                    <span className="badge">{i.tipo}</span>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <h3>{i.nombre}</h3>
                      <span className="tag">{i.edad}</span>
                    </div>
                    <p>
                      {i.descripcion}
                    </p>
                    <Link to={`/adopta/${i.id}`} className="button primary full">
                      Conocer más
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impacto Esperado */}
        <section className="impact">
          <div className="container">
            <div className="section-header">
              <h2>Impacto Esperado</h2>
              <p>Con tu ayuda, podemos lograr un cambio real en la vida de los animales callejeros.</p>
            </div>

            <div className="card-grid four-columns">
              <div className="card impact-card">
                <div className="card-icon">
                  <i className="icon-paw"></i>
                </div>
                <h3>Mayor visibilidad</h3>
                <p>Para animales en adopción que necesitan una segunda oportunidad.</p>
              </div>

              <div className="card impact-card">
                <div className="card-icon">
                  <i className="icon-gift"></i>
                </div>
                <h3>Más donaciones</h3>
                <p>Centralizadas y transparentes para fundaciones y rescatistas.</p>
              </div>

              <div className="card impact-card">
                <div className="card-icon">
                  <i className="icon-users"></i>
                </div>
                <h3>Red de voluntarios</h3>
                <p>Y hogares de paso activos para ayudar en momentos críticos.</p>
              </div>

              <div className="card impact-card">
                <div className="card-icon">
                  <i className="icon-search"></i>
                </div>
                <h3>Herramientas de gestión</h3>
                <p>Para fundaciones que necesitan organizar su trabajo diario.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta">
          <div className="container">
            <h2>¿Quieres ser parte del cambio?</h2>
            <p>Únete a nuestra comunidad y ayúdanos a transformar la vida de los animales en situación de calle.</p>
            <div className="button-group">
              <Link to="/adopta" className="button light">
                Quiero Adoptar
              </Link>
              <Link to="/dona" className="button outline-light">
                Quiero Ayudar
              </Link>
            </div>
          </div>
        </section>

        {/* Formulario de Contacto */}
        <section className="contact">
          <div className="container">
            <div className="form-container">
              <h2>¿Tienes alguna pregunta?</h2>
              <p>Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.</p>
              <form className="contact-form">
                <div className="form-group">
                  <input type="text" placeholder="Nombre completo" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Correo electrónico" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Asunto" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Tu mensaje" rows="4" required></textarea>
                </div>
                <button type="submit" className="button primary full">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
