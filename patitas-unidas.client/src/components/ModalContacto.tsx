import React from "react";
import { FaInstagram, FaWhatsapp, FaFacebook, FaEnvelope, FaTimes } from "react-icons/fa";
import "../styles/ModalContacto.css";

interface ModalContactoProps {
  instagram?: string;
  whatsapp?: string;
  facebook?: string;
  correo: string;
  nombreFundacion: string;
  onClose: () => void;
}

const redes = [
  {
    key: "instagram",
    icon: <FaInstagram color="#E1306C" size={28} />, // Rosa Instagram
    getUrl: (user: string) => `https://instagram.com/${user}`,
    label: "Instagram"
  },
  {
    key: "whatsapp",
    icon: <FaWhatsapp color="#25D366" size={28} />, // Verde WhatsApp
    getUrl: (num: string) => `https://wa.me/${num}`,
    label: "WhatsApp"
  },
  {
    key: "facebook",
    icon: <FaFacebook color="#1877F3" size={28} />, // Azul Facebook
    getUrl: (user: string) => `https://facebook.com/${user}`,
    label: "Facebook"
  }
];

export default function ModalContacto({ instagram, whatsapp, facebook, correo, nombreFundacion, onClose }: ModalContactoProps) {
  // Handler para cerrar solo si se hace clic en el overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className="modal-contacto-overlay" onClick={handleOverlayClick}>
      <div className="modal-contacto">
        <button className="modal-contacto-close" onClick={onClose} aria-label="Cerrar">
          <FaTimes size={20} />
        </button>
        <h2>Contactar a {nombreFundacion}</h2>
        <div className="modal-contacto-redes">
          {instagram && (
            <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" title="Instagram">
              <FaInstagram color="#E1306C" size={32} />
            </a>
          )}
          {whatsapp && (
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" title="WhatsApp">
              <FaWhatsapp color="#25D366" size={32} />
            </a>
          )}
          {facebook && (
            <a href={`https://facebook.com/${facebook}`} target="_blank" rel="noopener noreferrer" title="Facebook">
              <FaFacebook color="#1877F3" size={32} />
            </a>
          )}
          <a href={`mailto:${correo}`} title="Correo electrónico">
            <FaEnvelope color="#F50057" size={32} />
          </a>
        </div>
        <p className="modal-contacto-ayuda">Elige el medio de contacto que prefieras para comunicarte con la fundación.</p>
      </div>
    </div>
  );
} 