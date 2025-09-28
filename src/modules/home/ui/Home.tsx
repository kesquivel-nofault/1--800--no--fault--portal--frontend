import PageMeta from "../../../shared/ui/components/common/PageMeta";
import EcommerceMetrics from "../../../shared/ui/components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../../shared/ui/components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../../shared/ui/components/ecommerce/MonthlyTarget";
import StatisticsChart from "../../../shared/ui/components/ecommerce/StatisticsChart";

export default function Home() {
  return (
    <>
      <PageMeta
        title="1800nofault - portal"
        description="Portal dashboard for 1800nofault"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>
      </div>
    </>
  );
}
