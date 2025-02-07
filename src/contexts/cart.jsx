import { createContext, useState } from "react";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  hide: () => {},
});

export const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);

  const toggleHidden = () => setHidden(!hidden);
  const hide = () => setHidden(true);

  return (
    <CartContext.Provider value={{ hidden, toggleHidden, hide }}>
      {children}
    </CartContext.Provider>
  );
};
