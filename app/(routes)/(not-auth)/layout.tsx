import Sidebar from "@/app/components/sidebar/Sidebar";

export default async function NotAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}
