import React from "react";
import { FaInstagram, FaWhatsapp, FaFacebook, FaEnvelope, FaTimes } from "react-icons/fa";
import "../styles/ContactModal.css";
import { Contact } from "../types/foundation";

interface ContactModalProps {
  socialMedia: Contact[];
  email: string;
  name: string;
  onClose: () => void;
}

const social = [
  {
    key: "instagram",
    icon: <FaInstagram color="#E1306C" size={28} />, // Rosa Instagram
    label: "Instagram"
  },
  {
    key: "whatsapp",
    icon: <FaWhatsapp color="#25D366" size={28} />, // Verde WhatsApp
    label: "WhatsApp"
  },
  {
    key: "facebook",
    icon: <FaFacebook color="#1877F3" size={28} />, // Azul Facebook
    label: "Facebook"
  }
];

export default function ContactModal({ socialMedia, email, name, onClose }: ContactModalProps) {
  // Handler para cerrar solo si se hace clic en el overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className="modal-contact-overlay" onClick={handleOverlayClick}>
      <div className="modal-contact">
        <button className="modal-contact-close" onClick={onClose} aria-label="Cerrar">
          <FaTimes size={20} />
        </button>
        <h2>Contactar a {name}</h2>
        <p className="modal-contact-help">Elige el medio de contacto que prefieras para comunicarte con la fundación.</p>
        <div className="modal-contact-social">
          {socialMedia.map((contact) => (
            <a href={contact.url} target="_blank" rel="noopener noreferrer" title={contact.socialMedia}>
              {social.find((r) => r.key === contact.socialMedia)?.icon}
            </a>
          ))}
          <a href={`mailto:${email}`} title="Correo electrónico">
            <FaEnvelope color="#F50057" size={32} />
          </a>
        </div>
      </div>
    </div>
  );
} 