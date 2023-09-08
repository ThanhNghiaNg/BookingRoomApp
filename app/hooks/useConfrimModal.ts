import { create } from "zustand";

interface useConfirmModal {
  isOpen: boolean;
  dataParams: any;
  onOpen: (dataParams?: any) => void;
  onClose: () => void;
}

interface useConfirmOwnerModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface useConfirmCancelModal {
  isOpen: boolean;
  infoRoom: any;
  onOpen: (infoRoom?: any) => void;
  onClose: () => void;
}

const useConfirmModal = create<useConfirmModal>((set) => ({
  isOpen: false,
  dataParams: null,
  onOpen: (dataParams) => set({ isOpen: true, dataParams }),
  onClose: () => set({ isOpen: false, dataParams: null }),
}));

export const useConfirmOwnerModal = create<useConfirmOwnerModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useConfirmCancelModal = create<useConfirmCancelModal>((set) => ({
  isOpen: false,
  infoRoom: null,
  onOpen: (infoRoom) => set({ isOpen: true, infoRoom }),
  onClose: () => set({ isOpen: false, infoRoom: null }),
}));

export default useConfirmModal;
