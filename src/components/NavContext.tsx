"use client";
import { createContext, useContext, useState } from "react";

interface NavContextType {
  isOpen: boolean;
  toggleMenu: () => void;
}

const NavContext = createContext<NavContextType>({
  isOpen: false,
  toggleMenu: () => {},
});

export const useNav = () => useContext(NavContext);

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <NavContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </NavContext.Provider>
  );
};
