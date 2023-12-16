import Hamburguer from "@/app/assets/icons/Hamburguer";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <div
        className="hidden 
    lg:fixed 
    lg:inset-y-0 
    lg:left-0 
    lg:z-40 
    lg:w-20 
    xl:px-6
    lg:overflow-y-auto 
    lg:bg-white 
    lg:pb-4
    lg:pt-4
    lg:flex
    lg:flex-col
    justify-between"
      >
        <Hamburguer />
      </div>

      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
