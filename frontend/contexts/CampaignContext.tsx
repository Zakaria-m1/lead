import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiEndpoint, BACKEND_URL } from '@/config/api';

const CampaignContext = createContext<any>(null);

interface CampaignProviderProps {
  children: ReactNode;
}

export function CampaignProvider({ children }: CampaignProviderProps) {
  const [campaignData, setCampaignData] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(apiEndpoint('campaigns'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCampaignData(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();

    // WebSocket connection
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${wsProtocol}//${BACKEND_URL.replace(/^https?:\/\//, '')}/ws/campaigns/`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === "get_campaigns") {
        setCampaignData(data.campaigns);
      }
    };

    socket.onerror = () => {
      // Om WebSocket misslyckas, hämta data via API
      fetchCampaigns();
    };

    socket.onclose = () => {
      // Om WebSocket stängs, hämta data via API
      fetchCampaigns();
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <CampaignContext.Provider value={campaignData}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaignData() {
  return useContext(CampaignContext);
}
