"use client";
import { useCampaignData } from "@/contexts/CampaignContext";
import { useRouter } from "next/navigation";

const CampaignWidget = ({ title, value, icon, color }: any) => (
  <div className={`flex items-center p-4 rounded-lg ${color} text-white`}>
    <div className="text-4xl mr-4">{icon}</div>
    <div>
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="text-lg">{value}</p>
    </div>
  </div>
);

export default function KampanjerPage() {
  const campaignData = useCampaignData();
  const router = useRouter();

  if (!campaignData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-700">Laddar kampanjer...</div>
      </div>
    );
  }

  const handleCampaignClick = (campaign: any) => {
    router.push("/kampanj");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-white-800 mb-6">
        Välj Kampanj
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {campaignData.map((campaign: any) => (
          <li
            key={campaign.id}
            onClick={() => handleCampaignClick(campaign)}
            className="cursor-pointer p-6 bg-white shadow-lg rounded-lg hover:bg-indigo-50 hover:shadow-xl transition-all duration-200 ease-in-out"
          >
            <div className="text-2xl font-bold text-indigo-600 mb-4">
              {campaign.name}
            </div>
            <CampaignWidget
              title="Totalt skickade"
              value={
                campaign.total_sent ? campaign.total_sent.toString() : "N/A"
              }
              icon="📧"
              color="bg-blue-500"
            />
            <CampaignWidget
              title="Totala e-postmeddelanden"
              value={
                campaign.total_emails ? campaign.total_emails.toString() : "N/A"
              }
              icon="📨"
              color="bg-yellow-500"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
