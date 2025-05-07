import type { AnimalData } from "../types/animal";

interface AnimalCardProps {
  animal: AnimalData;
  onSelect: () => void;
}

export default function AnimalCard({ animal, onSelect }: AnimalCardProps) {
  return (
    <div
      className="card animal-card"
      onClick={onSelect}
      style={{ cursor: "pointer" }}
    >
      <div className="card-image">
        <img src={animal.image} alt={animal.name} />
        {animal.state === "Urgente" && (
          <span className="badge urgent">Urgente</span>
        )}
        <span className="badge">{animal.type}</span>
      </div>
      <div className="card-content">
        <h3>{animal.name}</h3>
        <span
          className={`tag ${
            animal.age === "Adulto" ? "tag-warning" : "tag-success"
          }`}
        >
          {animal.age}
        </span>
        <p>{animal.description}</p>
        <button className="button primary full" onClick={onSelect}>
          Conocer más
        </button>
      </div>
    </div>
  );
}
