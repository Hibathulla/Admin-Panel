import Sidebar from "@components/layouts/Sidebar";
import Navbar from "@components/layouts/Navbar";
import ProtectRoute from "./ProtectRoute";

export default function Adminayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectRoute>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ProtectRoute>
  );
}
