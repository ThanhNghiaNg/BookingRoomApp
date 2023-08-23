import { create } from "zustand";

interface useChatRecommendModalProp {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useChatRecommendModal = create<useChatRecommendModalProp>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useChatRecommendModal;
