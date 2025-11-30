import { useEffect, useRef } from "react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import CountUp from "./CountUp";
import "./WelcomeModal.css";

interface StatisticItem {
  /**
   * The label for the statistic
   */
  label: string;
  /**
   * The value to count up to
   */
  value: number;
  /**
   * Optional prefix (e.g., "$")
   */
  prefix?: string;
  /**
   * Optional suffix (e.g., "+", "k")
   */
  suffix?: string;
  /**
   * Icon or emoji to display
   */
  icon?: string;
}

interface WelcomeModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Callback when the modal is closed
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal description/subtitle
   */
  description?: string;
  /**
   * Array of statistics to display with count-up animation
   */
  statistics?: StatisticItem[];
}

/**
 * Welcome modal component that displays on first visit
 * Shows statistics with count-up animations
 */
export default function WelcomeModal({
  isOpen,
  onClose,
  title = "Bienvenido a Patitas Unidas",
  description = "Ayudamos a conectar personas con animales que necesitan un hogar",
  statistics = [
    { label: "Animales Rescatados", value: 150, suffix: "+", icon: "🐾" },
    { label: "Adopciones Exitosas", value: 89, suffix: "+", icon: "❤️" },
    { label: "Fundaciones Aliadas", value: 12, suffix: "+", icon: "🏠" },
    { label: "Años de Experiencia", value: 5, suffix: "+", icon: "⭐" },
  ],
}: WelcomeModalProps) {
  useLockBodyScroll(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`welcome-modal-overlay ${isOpen ? "active" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        className="welcome-modal-container"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="welcome-modal-close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ×
        </button>

        <div className="welcome-modal-content">
          {/* Header */}
          <div className="welcome-modal-header">
            <div className="welcome-logo">
              <span className="logo-icon">🐾</span>
            </div>
            <h1 className="welcome-title">{title}</h1>
            <p className="welcome-description">{description}</p>
          </div>

          {/* Statistics Grid */}
          <div className="welcome-stats-grid">
            {statistics.map((stat, index) => (
              <div key={index} className="stat-card">
                {stat.icon && <div className="stat-icon">{stat.icon}</div>}
                <div className="stat-value">
                  <CountUp
                    end={stat.value}
                    duration={2000}
                    delay={index * 150}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    easing="easeOut"
                    className="stat-number"
                  />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="welcome-modal-footer">
            <p className="welcome-cta-text">
              Juntos podemos darles una segunda oportunidad
            </p>
            <button className="welcome-cta-button" onClick={onClose}>
              Explorar Animales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
