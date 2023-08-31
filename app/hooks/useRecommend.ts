import { create } from "zustand";

interface useHobbies {
  data: any[];
  isCalled: boolean;
  onChangeRecommendData: (data: any[]) => void;
  onChangeIsCall: () => void;
}

const useRecommendModal = create<useHobbies>((set) => ({
  data: [],
  onChangeRecommendData: (data = []) => set({ data, isCalled: true }),
  onChangeIsCall: () => set({ data: [], isCalled: true }),
  isCalled: false,
}));

export default useRecommendModal;
