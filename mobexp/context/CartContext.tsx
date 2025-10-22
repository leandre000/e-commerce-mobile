import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

export type CartItem = {
  id: string;
  title: string;
  qty: number;
};

type CartState = {
  items: Record<string, CartItem>;
};

type CartAction =
  | { type: 'ADD'; payload: { id: string; title: string } }
  | { type: 'INC'; payload: { id: string } }
  | { type: 'DEC'; payload: { id: string } }
  | { type: 'REMOVE'; payload: { id: string } }
  | { type: 'CLEAR' };

const initialState: CartState = { items: {} };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const { id, title } = action.payload;
      const existing = state.items[id];
      const nextQty = (existing?.qty ?? 0) + 1;
      return {
        items: {
          ...state.items,
          [id]: { id, title, qty: nextQty },
        },
      };
    }
    case 'INC': {
      const { id } = action.payload;
      const it = state.items[id];
      if (!it) return state;
      return { items: { ...state.items, [id]: { ...it, qty: it.qty + 1 } } };
    }
    case 'DEC': {
      const { id } = action.payload;
      const it = state.items[id];
      if (!it) return state;
      const newQty = it.qty - 1;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = state.items;
        return { items: rest };
      }
      return { items: { ...state.items, [id]: { ...it, qty: newQty } } };
    }
    case 'REMOVE': {
      const { id } = action.payload;
      const { [id]: _, ...rest } = state.items;
      return { items: rest };
    }
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  count: number;
  add: (id: string, title: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = useCallback((id: string, title: string) => dispatch({ type: 'ADD', payload: { id, title } }), []);
  const inc = useCallback((id: string) => dispatch({ type: 'INC', payload: { id } }), []);
  const dec = useCallback((id: string) => dispatch({ type: 'DEC', payload: { id } }), []);
  const remove = useCallback((id: string) => dispatch({ type: 'REMOVE', payload: { id } }), []);
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const itemsArr = useMemo(() => Object.values(state.items), [state.items]);
  const count = useMemo(() => itemsArr.reduce((acc, it) => acc + it.qty, 0), [itemsArr]);

  const value = useMemo(
    () => ({ items: itemsArr, count, add, inc, dec, remove, clear }),
    [itemsArr, count, add, inc, dec, remove, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
