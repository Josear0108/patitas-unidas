"use client"

import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "/src/styles/Dona.css"

export default function Dona() {
  const [activeTab, setActiveTab] = useState("donacion")

  return (
    <div className="page-container">
      <Header />

      <main>
        <section className="dona-hero">
          <div className="container">
            <div className="section-header">
              <h1>Ayuda con tu donación</h1>
              <p>
                Tu aporte hace la diferencia. Puedes donar a campañas específicas o apadrinar a un animal para cubrir
                sus necesidades.
              </p>
            </div>

            <div className="tabs-container">
              <div className="tabs">
                <button
                  className={`tab ${activeTab === "donacion" ? "active" : ""}`}
                  onClick={() => setActiveTab("donacion")}
                >
                  Donación general
                </button>
                <button
                  className={`tab ${activeTab === "apadrinamiento" ? "active" : ""}`}
                  onClick={() => setActiveTab("apadrinamiento")}
                >
                  Apadrinamiento
                </button>
              </div>

              <div className="tab-content">
                {activeTab === "donacion" && (
                  <div className="card donation-card">
                    <div className="card-header centered">
                      <div className="card-icon">
                        <i className="icon-gift"></i>
                      </div>
                      <h2>Donación general</h2>
                      <p>
                        Tu donación ayudará a cubrir gastos de alimentación, atención veterinaria, medicamentos y
                        rescates de emergencia.
                      </p>
                    </div>

                    <div className="donation-amounts">
                      <button className="donation-amount">$20.000</button>
                      <button className="donation-amount">$50.000</button>
                      <button className="donation-amount">$100.000</button>
                    </div>

                    <div className="form-group">
                      <label htmlFor="custom-amount">Otra cantidad</label>
                      <input type="number" id="custom-amount" placeholder="Ingresa el monto" />
                    </div>

                    <div className="payment-methods">
                      <h3>Método de pago</h3>
                      <div className="payment-option">
                        <input type="radio" id="tarjeta" name="payment" value="tarjeta" defaultChecked />
                        <label htmlFor="tarjeta">
                          <i className="icon-credit-card"></i> Tarjeta de crédito/débito
                        </label>
                      </div>
                      <div className="payment-option">
                        <input type="radio" id="pse" name="payment" value="pse" />
                        <label htmlFor="pse">
                          <span className="icon-pse">+</span> PSE
                        </label>
                      </div>
                    </div>

                    <button className="button primary full">Donar ahora</button>
                  </div>
                )}

                {activeTab === "apadrinamiento" && (
                  <div className="card sponsorship-card">
                    <div className="card-header centered">
                      <div className="card-icon">
                        <i className="icon-heart"></i>
                      </div>
                      <h2>Apadrina un animal</h2>
                      <p>
                        Con tu apadrinamiento mensual, cubrirás las necesidades básicas de un animal específico mientras
                        encuentra un hogar definitivo.
                      </p>
                    </div>

                    <div className="animals-grid two-columns">
                      {[1, 2, 3, 4].map((i) => (
                        <div className="card animal-card" key={i}>
                          <div className="card-image">
                            <img src={`/placeholder.svg?height=200&width=300`} alt={`Animal ${i}`} />
                          </div>
                          <div className="card-content">
                            <div className="card-header">
                              <h3>{i % 2 === 0 ? "Max" : "Luna"}</h3>
                              <span className="tag tag-warning">Necesita ayuda</span>
                            </div>
                            <p>
                              {i % 2 === 0
                                ? "Necesita tratamiento médico y alimentación especial."
                                : "Requiere cirugía y cuidados post-operatorios."}
                            </p>
                            <button className="button secondary full">Apadrinar</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="sponsorship-frequency">
                      <h3>Frecuencia de apadrinamiento</h3>
                      <div className="payment-option">
                        <input type="radio" id="mensual" name="frequency" value="mensual" defaultChecked />
                        <label htmlFor="mensual">
                          <i className="icon-calendar"></i> Mensual
                        </label>
                      </div>
                      <div className="payment-option">
                        <input type="radio" id="trimestral" name="frequency" value="trimestral" />
                        <label htmlFor="trimestral">
                          <i className="icon-calendar"></i> Trimestral
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
