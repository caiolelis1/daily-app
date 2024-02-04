import Link from "next/link";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: JSX.Element;
  text: string;
  url?: string;
  action?: () => Promise<void>;
  expanded: boolean;
}

const SidebarItem = ({
  icon,
  text,
  url,
  action,
  expanded,
}: SidebarItemProps) => {
  if (action) {
    return (
      <li>
        <a
          onClick={action}
          className={cn(
            "flex items-center rounded-lg text-slate-900  cursor-pointer",
            expanded && "px-3 py-2 hover:bg-slate-200"
          )}
        >
          {icon}
          {expanded && (
            <span className="ml-3 flex-1 whitespace-nowrap">{text}</span>
          )}
        </a>
      </li>
    );
  }
  if (url) {
    return (
      <li>
        <Link
          href={url}
          className={cn(
            "flex items-center rounded-lg text-slate-900  cursor-pointer",
            expanded && "px-3 py-2 hover:bg-slate-200"
          )}
        >
          {icon}
          {expanded && (
            <span className="ml-3 flex-1 whitespace-nowrap">{text}</span>
          )}
        </Link>
      </li>
    );
  }
  return <div></div>;
};

export default SidebarItem;
