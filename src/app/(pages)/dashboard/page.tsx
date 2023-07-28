import DashboardCard from "@components/Dashboard/DashboardCard";
import DashboardBarChart from "@components/Charts/DashboardBarChart";
import DashboardPieChart from "@components/Charts/DashboardPieChart";

const DashboardPage = () => {
  return (
    <section>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
        <DashboardCard name="Total Revenue" value={10000} icon={"cash"} />
        <DashboardCard name="Total Customers" value={5000} icon={"user"} />
        <DashboardCard name="Total Products" value={25} icon={"product"} />
        <DashboardBarChart />
        <DashboardPieChart />
      </div>
    </section>
  );
};

export default DashboardPage;
