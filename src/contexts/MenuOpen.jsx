import { createContext, useState } from "react";

const MenuOpenContext = createContext();

export const MenuOpenProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const changeMenuOpen = (newLogin) => {
    setMenuOpen(newLogin);
  };

  return (
    <MenuOpenContext.Provider value={{ menuOpen, changeMenuOpen }}>
      {children}
    </MenuOpenContext.Provider>
  );
};

export default MenuOpenContext;
