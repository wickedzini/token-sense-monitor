
import SpendOverview from "@/components/dashboard/SpendOverview";
import SpendRingChart from "@/components/dashboard/SpendRingChart";
import SpendTrend from "@/components/dashboard/SpendTrend";
import TopModels from "@/components/dashboard/TopModels";
import SavingsSuggestions from "@/components/dashboard/SavingsSuggestions";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-gray-900">Analytics Overview</h2>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Last updated:</span>
          <span className="font-medium">May 18, 2025, 10:15 AM</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpendOverview />
        <SpendTrend className="md:col-span-2" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SpendRingChart />
        <TopModels />
      </div>

      <SavingsSuggestions />
    </div>
  );
};

export default Dashboard;
