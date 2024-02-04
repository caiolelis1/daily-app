"use client";

import { useState } from "react";

import SidebarItem from "./SidebarItem";
import { logout } from "@/app/actions/logout";
import { cn } from "@/lib/utils";

import Calendar from "@/app/assets/icons/Calendar";
import Hamburguer from "@/app/assets/icons/Hamburguer";
import Home from "@/app/assets/icons/Home";
import Money from "@/app/assets/icons/Money";
import Logout from "@/app/assets/icons/Logout";
import Close from "@/app/assets/icons/Close";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);

  const handleState = (value: boolean) => {
    setExpanded(value);
  };

  return (
    <div className="h-screen w-screen bg-white">
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in",
          expanded ? "w-64" : "w-16"
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4">
          {expanded ? (
            <Close onClick={handleState} />
          ) : (
            <Hamburguer onClick={handleState} />
          )}
          {expanded && (
            <div className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
              <span className="ml-3 text-base font-semibold">Daily App</span>
            </div>
          )}
          <ul className="space-y-2 text-sm font-medium mt-2">
            <SidebarItem
              icon={<Home border={!expanded} />}
              text="Home"
              url="/"
              expanded={expanded}
            />
            <SidebarItem
              icon={<Calendar border={!expanded} />}
              text="Calendário"
              url="/calendario"
              expanded={expanded}
            />
            <SidebarItem
              icon={<Money border={!expanded} />}
              text="Finanças"
              url="/financas"
              expanded={expanded}
            />
            <SidebarItem
              icon={<Logout border={!expanded} />}
              text="Deslogar"
              action={() => logout()}
              expanded={expanded}
            />
          </ul>
        </div>
      </aside>
      <main
        className={cn(
          " h-full transition-all duration-300 ease-in",
          expanded ? "pl-64" : "pl-16"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
