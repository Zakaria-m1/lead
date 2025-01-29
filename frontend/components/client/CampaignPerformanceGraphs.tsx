import React from "react";
import { Bar } from "react-chartjs-2";

interface CampaignPerformanceGraphsProps {
  data: any; // Adjust the type based on your data structure
}

const CampaignPerformanceGraphs: React.FC<CampaignPerformanceGraphsProps> = ({
  data,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Campaign Performance</h2>
      <Bar data={data} />
    </div>
  );
};

export default CampaignPerformanceGraphs;
