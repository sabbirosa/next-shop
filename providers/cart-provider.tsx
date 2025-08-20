"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem: CartContextValue["addItem"] = (product, quantity = 1) => {
    setItems(prev => {
      const found = prev.find(i => i._id === product._id);
      if (found) {
        return prev.map(i => i._id === product._id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...product, quantity }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i._id !== id));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(i => i._id === id ? { ...i, quantity } : i));
  };

  const clear = () => setItems([]);

  const { totalItems, totalPrice } = useMemo(() => {
    const totals = items.reduce((acc, i) => {
      acc.totalItems += i.quantity;
      acc.totalPrice += i.price * i.quantity;
      return acc;
    }, { totalItems: 0, totalPrice: 0 });
    return totals;
  }, [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalItems,
    totalPrice,
    isOpen,
    setOpen,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


