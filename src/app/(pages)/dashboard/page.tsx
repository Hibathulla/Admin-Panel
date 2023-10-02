import DashboardCard from "@components/Dashboard/DashboardCard";
import { DashboardBarChart } from "@components/Charts/DashboardBarChart";
import DashboardPieChart from "@components/Charts/DashboardPieChart";
import {
  CartIcon,
  CashIcon,
  CustomersIcon,
  ProductIcon,
} from "@assets/dashboard-card";

const DashboardPage = () => {
  return (
    <section>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-x-10 gap-y-8">
        <DashboardCard name="Total Revenue" value={10000} icon={CashIcon} />
        <DashboardCard
          name="Total Customers"
          value={5000}
          icon={CustomersIcon}
        />
        <DashboardCard name="Total Products" value={25} icon={ProductIcon} />
        <DashboardCard name="Total Bookings" value={25} icon={CartIcon} />
        <DashboardBarChart />
        <DashboardPieChart />
      </div>
    </section>
  );
};

export default DashboardPage;
