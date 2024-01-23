import { create } from "zustand";

const initialValue = {
  editOrderIndex: -1,
  isEditing: false,
  isAdding: false,
};

interface Store {
  editOrderIndex: number;
  isEditing: boolean;
  isAdding: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setIsAdding: (isAdding: boolean) => void;
  setEditOrderIndex: (editOrder: number) => void;
  resetEditOrderStore: () => void;
}

export const useEditOrderStore = create<Store>((set) => ({
  ...initialValue,
  setIsEditing: (isEditing: boolean) => {
    set(() => ({ isEditing }));
  },
  setIsAdding: (isAdding: boolean) => {
    set(() => ({ isAdding }));
  },
  setEditOrderIndex: (editOrderIndex: number) => {
    set(() => ({ editOrderIndex }));
  },
  resetEditOrderStore: () => {
    set(initialValue);
  },
}));
