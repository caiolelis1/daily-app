"use client";

import { useState } from "react";

import Calendar from "@/app/assets/icons/Calendar";
import Hamburguer from "@/app/assets/icons/Hamburguer";
import SidebarItem from "./SidebarItem";
import Home from "@/app/assets/icons/Home";
import Money from "@/app/assets/icons/Money";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-full ">
      {/* {expanded ? (
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64 xl:px-6 lg:overflow-y-auto lg:overflow-x-hidden lg:bg-white lg:pb-4 lg:pt-4 lg:flex lg:flex-col items-start gap-y-5">
          <div>
            <Hamburguer onClick={() => setExpanded((current) => !current)} />
          </div>
          <SidebarItem icon={<Home />} text="Página inicial" url="/" />
          <SidebarItem
            icon={<Calendar />}
            text="Calendário"
            url="/calendario"
          />
          <SidebarItem icon={<Money />} text="Finanças" url="/financas" />
        </div>
      ) : (
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:overflow-x-hidden lg:bg-white lg:pb-4 lg:pt-4 lg:flex lg:flex-col items-center gap-y-5">
          <Hamburguer onClick={() => setExpanded((current) => !current)} />
          <Home border={true} />
          <Calendar border={true} />
          <Money border={true} />
        </div>
      )}

      <main className="lg:pl-20 h-full">{children}</main> */}
    </div>
  );
};

export default Sidebar;
