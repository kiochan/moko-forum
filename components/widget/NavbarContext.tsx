import { createContext, useState } from 'react';
import { Navbar as NextUINavBar, Button, Link, Text } from "@nextui-org/react";

type NavbarContextType = {
  showBackButton: boolean;
  setShowBackButton: (show: boolean) => void;
  children: React.ReactNode;

};

export const NavbarContext = createContext<NavbarContextType>({
  showBackButton: false,
  setShowBackButton: () => {},
});

export const NavbarProvider: React.FC = ({ children }) => {
  const [showBackButton, setShowBackButton] = useState(false);

  return (
    <NavbarContext.Provider value={{ showBackButton, setShowBackButton }}>
      {children}
    </NavbarContext.Provider>
  );
};
