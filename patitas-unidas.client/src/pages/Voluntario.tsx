import { useEffect, useState } from "react";
import Header from "../components/Header"
import Footer from "../components/Footer"
import "/src/styles/Voluntario.css"
import { voluntarioService, OpcionVoluntariado } from "../services/voluntarioService";

export default function Voluntario() {
  const [opciones, setOpciones] = useState<OpcionVoluntariado[]>([]);
  const [tiposAyuda, setTiposAyuda] = useState<string[]>([]);
  const [disponibilidad, setDisponibilidad] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    voluntarioService.getOpcionesVoluntariado().then(setOpciones);
    voluntarioService.getTiposAyuda().then(setTiposAyuda);
    voluntarioService.getDisponibilidad().then(setDisponibilidad);
  }, []);

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
                {opciones.map((op) => (
                  <div className="card volunteer-card" key={op.titulo}>
                    <div className="card-icon">
                      <i className={op.icon}></i>
                    </div>
                    <h3>{op.titulo}</h3>
                    <p>{op.descripcion}</p>
                  </div>
                ))}
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
                      {tiposAyuda.map((option) => (
                        <div className="checkbox-option" key={option}>
                          <input type="checkbox" id={option.toLowerCase().replace(/ /g, "-")} />
                          <label htmlFor={option.toLowerCase().replace(/ /g, "-")}>{option}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Disponibilidad</label>
                    <div className="radio-options">
                      {disponibilidad.map((d) => (
                        <div className="radio-option" key={d.id}>
                          <input type="radio" id={d.id} name="disponibilidad" value={d.id} defaultChecked={d.id === "fines"} />
                          <label htmlFor={d.id}>{d.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="mensaje">¿Por qué quieres ser voluntario?</label>
                    <textarea id="mensaje" rows={4} required></textarea>
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