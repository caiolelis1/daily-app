import { createContext, useState } from "react";

export const SidebarContext = createContext(false);

const Context = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <SidebarContext.Provider value={expanded}>
      {children}
    </SidebarContext.Provider>
  );
};

export default Context;
