import { FC, useState, createContext, ReactNode } from "react";
type SidebarContext = { sidebarToggle: any; toggleSidebar: () => void };
type Props = {
  children?: ReactNode;
};

export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const SidebarProvider = ({ children }: Props) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
