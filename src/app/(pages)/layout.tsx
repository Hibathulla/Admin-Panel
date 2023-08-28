import Sidebar from "@components/layouts/Sidebar";
import Navbar from "@components/layouts/Navbar";
import ProtectRoute from "./ProtectRoute";
import { Separator } from "@components/ui/separator";

export default function Adminlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectRoute>
      <div className="relative flex h-full">
        <Sidebar />
        <div className="w-full h-full">
          <Navbar />
          <Separator />
          <main className="p-6 ml-52">{children}</main>
        </div>
      </div>
    </ProtectRoute>
  );
}
