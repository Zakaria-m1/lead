const CampaignOverviewTable = () => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Campaign Overview
      </h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-left text-sm font-semibold text-gray-600">
              Campaign
            </th>
            <th className="py-2 text-left text-sm font-semibold text-gray-600">
              Status
            </th>
            <th className="py-2 text-left text-sm font-semibold text-gray-600">
              Emails Sent
            </th>
            <th className="py-2 text-left text-sm font-semibold text-gray-600">
              Open Rate
            </th>
            <th className="py-2 text-left text-sm font-semibold text-gray-600">
              Click Rate
            </th>
            <th className="py-2 text-left text-sm font-semibold text-gray-600">
              Replies
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 text-sm text-gray-700">Summer Campaign</td>
            <td className="py-2 text-sm text-green-500">Active</td>
            <td className="py-2 text-sm text-gray-700">15,000</td>
            <td className="py-2 text-sm text-gray-700">42%</td>
            <td className="py-2 text-sm text-gray-700">18%</td>
            <td className="py-2 text-sm text-gray-700">1,200</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="py-2 text-sm text-gray-700">Winter Campaign</td>
            <td className="py-2 text-sm text-yellow-500">Paused</td>
            <td className="py-2 text-sm text-gray-700">8,000</td>
            <td className="py-2 text-sm text-gray-700">35%</td>
            <td className="py-2 text-sm text-gray-700">14%</td>
            <td className="py-2 text-sm text-gray-700">800</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CampaignOverviewTable;
