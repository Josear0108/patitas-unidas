import Header from "../components/Header"
import Footer from "../components/Footer"
import "/src/styles/Voluntario.css"

export default function Voluntario() {
  return (
    <div className="page-container">
      <Header />

      <main>
        <section className="voluntario-hero">
          <div className="container">
            <div className="section-header">
              <h1>Sé parte de nuestro equipo de voluntarios</h1>
              <p>
                Tu tiempo y habilidades son valiosos. Hay muchas formas en las que puedes ayudar a los animales que lo
                necesitan.
              </p>
            </div>

            <div className="volunteer-options">
              <div className="card-grid three-columns">
                <div className="card volunteer-card">
                  <div className="card-icon">
                    <i className="icon-home"></i>
                  </div>
                  <h3>Hogar de paso</h3>
                  <p>
                    Ofrece un espacio temporal en tu hogar para animales que esperan ser adoptados. Todos los gastos son
                    cubiertos por la fundación.
                  </p>
                </div>

                <div className="card volunteer-card">
                  <div className="card-icon">
                    <i className="icon-car"></i>
                  </div>
                  <h3>Transporte</h3>
                  <p>Ayuda a transportar animales a citas veterinarias, eventos de adopción o a sus nuevos hogares.</p>
                </div>

                <div className="card volunteer-card">
                  <div className="card-icon">
                    <i className="icon-clock"></i>
                  </div>
                  <h3>Tiempo y habilidades</h3>
                  <p>
                    Comparte tus habilidades: fotografía, diseño, redes sociales, organización de eventos o atención
                    directa a los animales.
                  </p>
                </div>
              </div>
            </div>

            <div className="volunteer-form-container">
              <div className="card">
                <h2>Formulario de voluntariado</h2>
                <form className="volunteer-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="nombre">Nombre completo</label>
                      <input type="text" id="nombre" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Correo electrónico</label>
                      <input type="email" id="email" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="telefono">Teléfono</label>
                      <input type="tel" id="telefono" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ciudad">Ciudad</label>
                      <input type="text" id="ciudad" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>¿Cómo te gustaría ayudar?</label>
                    <div className="checkbox-grid">
                      {["Hogar de paso", "Transporte", "Eventos", "Redes sociales", "Fotografía", "Otro"].map(
                        (option) => (
                          <div className="checkbox-option" key={option}>
                            <input type="checkbox" id={option.toLowerCase().replace(" ", "-")} />
                            <label htmlFor={option.toLowerCase().replace(" ", "-")}>{option}</label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Disponibilidad</label>
                    <div className="radio-options">
                      <div className="radio-option">
                        <input type="radio" id="fines" name="disponibilidad" value="fines" defaultChecked />
                        <label htmlFor="fines">Fines de semana</label>
                      </div>
                      <div className="radio-option">
                        <input type="radio" id="dias" name="disponibilidad" value="dias" />
                        <label htmlFor="dias">Días específicos entre semana</label>
                      </div>
                      <div className="radio-option">
                        <input type="radio" id="flexible" name="disponibilidad" value="flexible" />
                        <label htmlFor="flexible">Horario flexible</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="mensaje">¿Por qué quieres ser voluntario?</label>
                    <textarea id="mensaje" rows="4" required></textarea>
                  </div>

                  <div className="form-group checkbox-single">
                    <input type="checkbox" id="terminos" required />
                    <label htmlFor="terminos">Acepto los términos y condiciones</label>
                  </div>

                  <button type="submit" className="button primary full">
                    Enviar solicitud
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
