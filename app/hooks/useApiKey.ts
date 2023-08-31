import { create } from "zustand";
interface apiKeyStore {
  keyIndex: number;
  setKeyIndex: (index: number) => void;
}

const userApiKey = create<apiKeyStore>((set) => ({
  keyIndex: 0,
  setKeyIndex: (keyIndex: number) => {
    set({ keyIndex });
  },
}));

export default userApiKey;
