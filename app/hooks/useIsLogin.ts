import { create } from "zustand";

interface IsUserLoginStore {
  isLogin: boolean;
  onLoginSuccess: () => void;
  onLogoutSuccess: () => void;
}

const isUserLoginModal = create<IsUserLoginStore>((set) => ({
  isLogin: false,
  onLoginSuccess: () => {
    set({ isLogin: true });
  },
  onLogoutSuccess: () => {
    set({ isLogin: false });
  },
}));

export default isUserLoginModal;
