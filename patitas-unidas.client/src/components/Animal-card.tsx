"use client"

import { useState } from "react"
import AnimalDetailModal from "./Animal-detail-modal"
import { AnimalData } from "../types/animal"

interface AnimalCardProps {
    animal: AnimalData
  }

export default function AnimalCard({ animal }: AnimalCardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (e: { preventDefault: () => void }) => {
    e.preventDefault() // Prevenir la navegación del Link
    setModalOpen(true)
  }

  return (
    <>
      <div className="card animal-card">
        <div className="card-image">
          <img src={`${animal.image}?height=200&width=300`} alt={`Animal ${animal.id}`} />
          <span className="badge">{animal.type}</span>
          {animal.state === "Urgente" && <span className="badge urgent">Urgente</span>}
        </div>
        <div className="card-content">
          <div className="card-header">
            <h3>{animal.name}</h3>
            <span className={`tag ${animal.age === "Adulto" ? "tag-warning" : "tag-success"}`}>{animal.age}</span>
          </div>
          <div className="tags">
            <span className="tag tag-small">{animal.tag}</span>
          </div>
          <p>{animal.description}</p>
          <a href="#" onClick={openModal} className="button primary full">
            Conocer más
          </a>
        </div>
      </div>

      <AnimalDetailModal isOpen={modalOpen} onClose={() => setModalOpen(false)} animalId={animal.id} />
    </>
  )
}
