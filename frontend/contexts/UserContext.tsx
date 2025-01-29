"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { apiEndpoint } from '@/config/api';

interface Company {
  id: number;
  name: string;
}

interface UserProfile {
  username: string;
  email: string;
  role: string;
  companies: Company[];
}

interface Campaign {
  id: number;
  name: string;
  company: { id: number; name: string };
}

interface UserContextProps {
  profile: UserProfile | null;
  selectedCampaign: Campaign | null;
  selectCampaign: (campaign: Campaign) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const router = useRouter();

  const selectCampaign = (campaign: Campaign) => {
    console.log("Selected Campaign in UserContext: ", campaign);
    setSelectedCampaign(campaign); // Save campaign in context
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setProfile(null);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          apiEndpoint('auth/verify-token'),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProfile({
            username: data.username,
            email: data.email,
            role: data.role,
            companies: data.companies,
          });

          if (data.role === "Client" && data.companies.length > 0) {
            const defaultCampaign = {
              id: -1,
              name: `Campaign for ${data.companies[0].name}`,
              company: {
                id: data.companies[0].id,
                name: data.companies[0].name,
              },
            };
            setSelectedCampaign(defaultCampaign);
          }
        } else {
          router.push("/signin");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/signin");
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <UserContext.Provider value={{ profile, selectedCampaign, selectCampaign }}>
      {children}
    </UserContext.Provider>
  );
};
