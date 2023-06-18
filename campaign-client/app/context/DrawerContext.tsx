"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

interface ContextProps {
  open: boolean;
  toggleDrawer: () => void;
}
const DrawerContext = createContext<ContextProps>({
  open: false,
  toggleDrawer: () => true ,
});

export const DrawerContextProvider = ({children} : {children: React.ReactNode}) => {
  const [open, setOpen] = useState(false);
  return (
    <DrawerContext.Provider value={({open, toggleDrawer: () => setOpen(prev => !prev)})}>
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawerContext = () => useContext(DrawerContext);