import { Foundation } from "../types/foundation";
import { Link } from "react-router-dom";

interface FoundationCardProps {
  foundation: Foundation;
  onContact?: () => void;
}

export default function FoundationCard({ foundation, onContact }: FoundationCardProps) {
  return (
    <div className="card foundation-card">
      <div className="card-image">
        <img src={foundation.logo} alt={`Logo de ${foundation.name}`} />
      </div>
      <div className="card-content">
        <h3>{foundation.name}</h3>
        <span className="tag">{foundation.city}</span>
        <p>{foundation.description}</p>
        {onContact && (
          <button className="button secondary full" onClick={onContact}>Contactar</button>
        )}
        <Link to={`/foundations/${foundation.id}`} className="button primary full" style={{marginTop: '0.5rem'}}>Ver más</Link>
      </div>
    </div>
  );
} 