import { useState, useEffect } from "react";

const WELCOME_MODAL_KEY = "patitas-unidas-welcome-modal-seen";

interface UseWelcomeModalReturn {
  /**
   * Whether the modal is currently open
   */
  isOpen: boolean;
  /**
   * Function to close the modal and mark it as seen
   */
  closeModal: () => void;
  /**
   * Function to reset the modal state (for testing/debugging)
   */
  resetModal: () => void;
}

/**
 * Custom hook to manage the welcome modal state
 * Uses localStorage to track if the user has already seen the modal
 *
 * @returns Object with isOpen state and control functions
 */
export function useWelcomeModal(): UseWelcomeModalReturn {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the welcome modal
    const hasSeenModal = localStorage.getItem(WELCOME_MODAL_KEY);

    if (!hasSeenModal) {
      // Add a small delay before showing the modal for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    // Mark the modal as seen in localStorage
    localStorage.setItem(WELCOME_MODAL_KEY, "true");
  };

  const resetModal = () => {
    // Helper function to reset the modal state (useful for testing)
    localStorage.removeItem(WELCOME_MODAL_KEY);
    setIsOpen(true);
  };

  return {
    isOpen,
    closeModal,
    resetModal,
  };
}
