import Link from "next/link";

interface SidebarItemProps {
  icon: JSX.Element;
  text: string;
  url: string;
}

const SidebarItem = ({ icon, text, url }: SidebarItemProps) => {
  return (
    <Link href={url}>
      <div className="flex gap-3 rounded-md items-center cursor-pointer border-b w-full">
        {icon}
        <span className="text-xl">{text}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;
