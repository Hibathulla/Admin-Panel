import Sidebar from "@components/layouts/Sidebar";
import Navbar from "@components/layouts/Navbar";

export default function Dashboardayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
