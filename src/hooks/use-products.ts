import { Product } from "@/pages/Product/data";
import { create } from "zustand";

interface UseProducts {
  products: Product[];
  onInitial: (products: Product[]) => void;
  onAdd: (newProduct: Product) => void;
  onDelete: (id: number) => void;
  onUpdate: (updatedProduct: Product) => void;
}

export const useProducts = create<UseProducts>((set) => ({
  products: [],
  onInitial: (products: Product[]) => set({ products }),
  onAdd: (newProduct) =>
    set((state) => ({ ...state, products: [...state.products, newProduct] })),
  onDelete: (id) => {
    set((state) => ({
      ...state,
      products: state.products.filter((product) => product.id !== id),
    }));
  },
  onUpdate: (updatedProduct) => {
    set((state) => ({
      ...state,
      products: state.products.map((product) =>
        product.id !== updatedProduct.id ? product : updatedProduct
      ),
    }));
  },
}));
