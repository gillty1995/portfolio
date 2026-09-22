"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

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

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(() => ({ isOpen, toggleMenu }), [isOpen, toggleMenu]);

  return (
    <NavContext.Provider value={value}>
      {children}
    </NavContext.Provider>
  );
};
