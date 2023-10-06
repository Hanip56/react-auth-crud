import { User } from "@/types";
import { create } from "zustand";

interface UseAuth {
  user: User | null;
  onSet: (user: User) => void;
  onRemove: () => void;
}

const STORAGE_KEY = "@auth_user";

const res = localStorage.getItem(STORAGE_KEY);
let user: User | null = null;

if (res) {
  user = JSON.parse(res);
}

export const useAuth = create<UseAuth>((set) => ({
  user,
  onSet: (user) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user });
  },
  onRemove: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null });
  },
}));
