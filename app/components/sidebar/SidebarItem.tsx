import Link from "next/link";

interface SidebarItemProps {
  icon: JSX.Element;
  text: string;
  url?: string;
  action?: () => Promise<void>;
}

const SidebarItem = ({ icon, text, url, action }: SidebarItemProps) => {
  if (action) {
    return (
      <li>
        <a
          onClick={action}
          className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-200 cursor-pointer"
        >
          {icon}
          <span className="ml-3 flex-1 whitespace-nowrap">{text}</span>
        </a>
      </li>
    );
  }
  if (url) {
    return (
      <li>
        <Link
          href={url}
          className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-200"
        >
          {icon}
          <span className="ml-3 flex-1 whitespace-nowrap">{text}</span>
        </Link>
      </li>
    );
  }
  return <div></div>;
};

export default SidebarItem;
