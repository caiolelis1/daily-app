"use client";

import { createContext, useState } from "react";

import Calendar from "@/app/assets/icons/Calendar";
import Hamburguer from "@/app/assets/icons/Hamburguer";
import SidebarItem from "./SidebarItem";
import Home from "@/app/assets/icons/Home";
import Money from "@/app/assets/icons/Money";
import Logout from "@/app/assets/icons/Logout";
import { logout } from "@/app/actions/logout";
import { cn } from "@/lib/utils";
import Close from "@/app/assets/icons/Close";
import Context from "@/app/context/SidebarContext";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);

  const handleState = (value: boolean) => {
    setExpanded(value);
  };

  return (
    <Context>
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
            <div className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 lucide lucide-command"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <span className="ml-3 text-base font-semibold">Taxonomy</span>
            </div>
            <ul className="space-y-2 text-sm font-medium">
              <SidebarItem
                icon={<Home border={!expanded} />}
                text="Home"
                url="/"
              />
              <SidebarItem
                icon={<Calendar border={!expanded} />}
                text="Calendário"
                url="/calendario"
              />
              <SidebarItem
                icon={<Money border={!expanded} />}
                text="Finanças"
                url="/financas"
              />
              <SidebarItem
                icon={<Logout border={!expanded} />}
                text="Deslogar"
                action={() => logout()}
              />
            </ul>
          </div>
        </aside>
        <main className="lg:pl-64 h-full">{children}</main>
      </div>
    </Context>
  );
};

export default Sidebar;
