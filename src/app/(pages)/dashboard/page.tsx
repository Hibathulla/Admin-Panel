"use client";
import DashboardCard from "@components/Dashboard/DashboardCard";
import { DashboardBarChart } from "@components/Charts/DashboardBarChart";
import DashboardPieChart from "@components/Charts/DashboardPieChart";
import { useGetOrderStats } from "../../../services/order";
import {
  CartIcon,
  CashIcon,
  CustomersIcon,
  ProductIcon,
} from "@assets/dashboard-card";
import { useGetUserStats } from "../../../services/user";
import { useGetProductStats } from "../../../services/product";

const DashboardPage = () => {
  const { data: orderStats } = useGetOrderStats();
  const { data: userStats } = useGetUserStats();
  const { data: productStats } = useGetProductStats();

  const totalAmount = orderStats?.[0]?.totalAmounts;
  const totalOrders = orderStats?.[0]?.totalOrders;
  const totalUsers = userStats?.[0]?.totalUsers;
  const totalProducts = productStats?.[0]?.totalProducts;

  return (
    <section>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-x-10 gap-y-8">
        <DashboardCard
          name="Total Revenue"
          value={`₹${totalAmount}`}
          icon={CashIcon}
        />
        <DashboardCard
          name="Total Customers"
          value={totalUsers}
          icon={CustomersIcon}
        />
        <DashboardCard
          name="Total Products"
          value={totalProducts}
          icon={ProductIcon}
        />
        <DashboardCard
          name="Total Bookings"
          value={totalOrders}
          icon={CartIcon}
        />
        <DashboardBarChart />
        <DashboardPieChart />
      </div>
    </section>
  );
};

export default DashboardPage;
