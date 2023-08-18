import { create } from "zustand";

interface useHobbies {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useHobbiesModal = create<useHobbies>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useHobbiesModal;
