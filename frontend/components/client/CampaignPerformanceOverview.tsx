interface CampaignPerformanceProps {
  emailsSent: number;
  leadsGenerated: number;
  conversions: number;
}

const CampaignPerformanceOverview: React.FC<CampaignPerformanceProps> = ({
  emailsSent,
  leadsGenerated,
  conversions,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Campaign Performance Overview
      </h2>
      <p className="text-gray-600">Emails Sent: {emailsSent}</p>
      <p className="text-gray-600">Leads Generated: {leadsGenerated}</p>
      <p className="text-gray-600">Conversions: {conversions}</p>
    </div>
  );
};

export default CampaignPerformanceOverview;
