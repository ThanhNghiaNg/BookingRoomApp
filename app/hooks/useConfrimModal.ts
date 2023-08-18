import { create } from "zustand";

interface useConfirmModal {
  isOpen: boolean;
  dataParams: any;
  onOpen: (dataParams?: any) => void;
  onClose: () => void;
}

const useConfirmModal = create<useConfirmModal>((set) => ({
  isOpen: false,
  dataParams: null,
  onOpen: (dataParams) => set({ isOpen: true, dataParams }),
  onClose: () => set({ isOpen: false, dataParams: null }),
}));

export default useConfirmModal;
