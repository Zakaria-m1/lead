import { Line, Doughnut } from "react-chartjs-2";

interface ChartProps {
  emailPerformanceData: any;
  replyRateData: any;
}

const Charts: React.FC<ChartProps> = ({
  emailPerformanceData,
  replyRateData,
}) => {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow p-6 col-span-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Email Performance Over Time
        </h2>
        <Line data={emailPerformanceData} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Reply Rate</h2>
        <Doughnut data={replyRateData} />
      </div>
    </div>
  );
};

export default Charts;
