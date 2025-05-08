"use client";

import { useState, useEffect, useRef } from "react";
import { AnimalData } from "../types/animal";
import { animalService } from "../services/animalService";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { useNavigate } from "react-router-dom";
import "../styles/Animal-modal.css";

interface AnimalDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  animalId: number;
  fromUrl?: boolean;
}

export default function AnimalDetailModal({
  isOpen,
  onClose,
  animalId,
  fromUrl = false,
}: AnimalDetailModalProps) {
  useLockBodyScroll(isOpen);
  const [animal, setAnimal] = useState<AnimalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && animalId && !fromUrl) {
      navigate(`/adopta/${animalId}`, { replace: false });
    }
  }, [isOpen, animalId, navigate, fromUrl]);

  useEffect(() => {
    if (isOpen && animalId) {
      animalService.getAnimalData(animalId).then((data) => {
        setAnimal(data);
        setLoading(false);
      });

      setLoading(true);
    }
  }, [isOpen, animalId]);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen]);

  const handleClose = () => {
    if (!fromUrl) {
      navigate("/adopta", { replace: true });
    }
    onClose();
  };

  const nextImage = () => {
    if (animal && animal.images && animal.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === animal.images!.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (animal && animal.images && animal.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? animal.images!.length - 1 : prevIndex - 1
      );
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleCopyLink = async () => {
    const url = window.location.origin + location.pathname;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      console.log("Error al copiar");
    }
  };

  useEffect(() => {
    if (isOpen && !loading && animal) {
      const tabButtons = document.querySelectorAll(".tab-button");
      const tabContents = document.querySelectorAll(".tab-content");

      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Desactivar todas las pestañas
          tabButtons.forEach((btn) => btn.classList.remove("active"));
          tabContents.forEach((content) => content.classList.remove("active"));

          // Activar la pestaña seleccionada
          button.classList.add("active");
          const tabId = button.getAttribute("data-tab");
          const tabElement = document.getElementById(`${tabId}-tab`);
          if (tabElement) {
            tabElement.classList.add("active");
          }
        });
      });
    }
  }, [isOpen, loading, animal]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <div className="modal-loading">
            <div className="loading-spinner"></div>
          </div>
        ) : animal ? (
          <div className="modal-content">
            <button className="modal-close" onClick={handleClose}>
              ×
            </button>

            <div className="modal-grid">
              {/* Galería de imágenes */}
              <div className="modal-image-gallery">
                <img
                  src={
                    animal.images
                      ? animal.images[currentImageIndex]
                      : animal.image
                  }
                  alt={animal.name}
                  className="modal-main-image"
                />

                {/* Controles de navegación de imágenes */}
                {animal.images && animal.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="image-nav-button prev"
                      aria-label="Imagen anterior"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextImage}
                      className="image-nav-button next"
                      aria-label="Imagen siguiente"
                    >
                      ›
                    </button>

                    {/* Indicador de posición */}
                    <div className="image-counter">
                      {currentImageIndex + 1} / {animal.images.length}
                    </div>

                    {/* Miniaturas */}
                    <div className="image-thumbnails">
                      {animal.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`thumbnail ${
                            idx === currentImageIndex ? "active" : ""
                          }`}
                        >
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`Miniatura ${idx + 1}`}
                          />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="modal-content-right">
                {/* Información del animal */}
                <div className="modal-animal-info">
                  <div className="animal-header">
                    <div>
                      <h2 className="animal-name">{animal.name}</h2>
                      <div className="animal-location">
                        <span className="location-icon">📍</span>
                        <span>
                          {animal.foundation?.city || "Ciudad no disponible"}
                        </span>
                      </div>
                    </div>
                    <div className="animal-actions">
                      <button
                        className="action-button"
                        onClick={handleCopyLink}
                      >
                        🔗
                      </button>
                      <button className="action-button">❤️</button>
                    </div>
                  </div>

                  <div className="animal-badges">
                    <span className="badge">{animal.type}</span>
                    {animal.gender && (
                      <span className="badge badge-blue">{animal.gender}</span>
                    )}
                    <span
                      className={`badge ${
                        animal.age === "Adulto" ? "badge-amber" : "badge-green"
                      }`}
                    >
                      {animal.age}
                    </span>
                    {animal.state === "Urgente" && (
                      <span className="badge badge-red">Urgente</span>
                    )}
                  </div>

                  <div className="animal-tabs">
                    <div className="tabs-header">
                      <button className="tab-button active" data-tab="info">
                        Información
                      </button>
                      <button className="tab-button" data-tab="story">
                        Historia
                      </button>
                      <button className="tab-button" data-tab="foundation">
                        Fundación
                      </button>
                    </div>

                    <div className="tab-content active" id="info-tab">
                      <div className="info-section">
                        <h3>Descripción</h3>
                        <p>{animal.description}</p>
                      </div>

                      {animal.personality && animal.personality.length > 0 && (
                        <div className="info-section">
                          <h3>Personalidad</h3>
                          <div className="personality-tags">
                            {animal.personality.map((trait) => (
                              <span key={trait} className="tag">
                                {trait}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="info-grid">
                        <div className="info-column">
                          <h3>Características</h3>
                          <ul className="info-list">
                            {animal.breed && (
                              <li>
                                <span>Raza:</span>
                                <span>{animal.breed}</span>
                              </li>
                            )}
                            {animal.size && (
                              <li>
                                <span>Tamaño:</span>
                                <span>{animal.size}</span>
                              </li>
                            )}
                            {animal.color && (
                              <li>
                                <span>Color:</span>
                                <span>{animal.color}</span>
                              </li>
                            )}
                          </ul>
                        </div>

                        <div className="info-column">
                          <h3>Salud</h3>
                          <ul className="info-list">
                            {animal.healthStatus && (
                              <li>
                                <span>Estado:</span>
                                <span>{animal.healthStatus}</span>
                              </li>
                            )}
                            {animal.vaccinated !== undefined && (
                              <li>
                                <span>Vacunado:</span>
                                <span>{animal.vaccinated ? "Sí" : "No"}</span>
                              </li>
                            )}
                            {animal.sterilized !== undefined && (
                              <li>
                                <span>Esterilizado:</span>
                                <span>{animal.sterilized ? "Sí" : "No"}</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {(animal.goodWith || animal.notGoodWith) && (
                        <div className="info-section">
                          <h3>Compatibilidad</h3>
                          <div className="compatibility-grid">
                            {animal.goodWith && animal.goodWith.length > 0 && (
                              <div>
                                <p>Se lleva bien con:</p>
                                <div className="compatibility-tags">
                                  {animal.goodWith.map((item) => (
                                    <span key={item} className="tag tag-green">
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {animal.notGoodWith &&
                              animal.notGoodWith.length > 0 && (
                                <div>
                                  <p>No se lleva bien con:</p>
                                  <div className="compatibility-tags">
                                    {animal.notGoodWith.map((item) => (
                                      <span key={item} className="tag tag-red">
                                        {item}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      )}

                      {animal.adoptionRequirements &&
                        animal.adoptionRequirements.length > 0 && (
                          <div className="info-section">
                            <h3>Requisitos de adopción</h3>
                            <ul className="requirements-list">
                              {animal.adoptionRequirements.map((req, idx) => (
                                <li key={idx}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>

                    <div className="tab-content" id="story-tab">
                      <div className="story-content">
                        {animal.createdAt && (
                          <div className="adoption-date">
                            <span className="calendar-icon">📅</span>
                            <span>
                              En adopción desde{" "}
                              {new Date(animal.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        )}

                        {animal.story && (
                          <>
                            <h3>La historia de {animal.name}</h3>
                            <p>{animal.story}</p>

                            <div className="story-quote">
                              <p>
                                "Cada animal tiene una historia que contar. Al
                                adoptar a {animal.name}, no solo le das un
                                hogar, sino que también te conviertes en parte
                                de su historia de superación."
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="tab-content" id="foundation-tab">
                      {animal.foundation && (
                        <div className="foundation-content">
                          <div className="foundation-header">
                            <div className="foundation-logo">
                              <img
                                src={
                                  animal.foundation.logo || "/placeholder.svg"
                                }
                                alt={animal.foundation.name}
                              />
                            </div>
                            <div>
                              <h3>{animal.foundation.name}</h3>
                              <p>{animal.foundation.city}</p>
                            </div>
                          </div>

                          <p className="foundation-description">
                            {animal.foundation.description}
                          </p>

                          <div className="foundation-contact">
                            <div className="contact-item">
                              <span className="contact-icon">✉️</span>
                              <a href={`mailto:${animal.foundation.email}`}>
                                {animal.foundation.email}
                              </a>
                            </div>
                            <div className="contact-item">
                              <span className="contact-icon">📞</span>
                              <a href={`tel:${animal.foundation.phone}`}>
                                {animal.foundation.phone}
                              </a>
                            </div>
                          </div>

                          <a
                            href={`/fundaciones/${animal.foundation.id}`}
                            className="foundation-link"
                          >
                            Ver más animales de esta fundación
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="adoption-button-container">
                  <button className="button primary">
                    Quiero adoptar a {animal.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-error">
            <p>No se pudo cargar la información del animal.</p>
          </div>
        )}
      </div>
    </div>
  );
}
