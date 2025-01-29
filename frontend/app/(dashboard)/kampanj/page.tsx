"use client";

import { useUser } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import KPIWidgets from "@/components/client/KPIWidgets";
import RecentActivity from "@/components/client/RecentActivity";
import Modal from "@/components/ui/Modal";
import Charts from "@/components/client/Charts";
import EmailManagement from "@/components/client/EmailManagement"; // Lägg till denna rad

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import router from "next/router";
import { apiEndpoint } from '@/config/api';

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function KlientDashboard() {
  const { profile, selectedCampaign } = useUser(); // Use context to get selectedCampaign
  const [companyData, setCompanyData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("Selected Campaign: ", selectedCampaign); // Log to ensure selectedCampaign is populated correctly
    if (!selectedCampaign && profile?.role == "SuperAdmin") {
      router.push("/kampanjer");
    }
  }, [selectedCampaign]);

  const fetchStatistics = async () => {
    if (!selectedCampaign) return;
    
    const apiPath = `companies/statistics/${
      typeof selectedCampaign.company === 'number' 
        ? selectedCampaign.company 
        : selectedCampaign.company.id
    }`;
    
    try {
      const response = await fetch(apiEndpoint(apiPath), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCompanyData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching company data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCampaign) {
      fetchStatistics();
    }
  }, [selectedCampaign]);

  if (!profile) {
    return <div>Loading user profile...</div>;
  }

  if (loading) {
    return <div>Loading company data...</div>;
  }

  if (!companyData || !selectedCampaign) {
    return <div>No company data available.</div>;
  }

  const kpiWidgets = [
    {
      title: "Skickade e-postmeddelanden",
      value: companyData?.total_sent_emails?.toString() || "0",
      icon: "📧",
      color: "bg-indigo-500",
    },
    {
      title: "Skickade idag",
      value: companyData?.sent_today?.toString() || "0",
      icon: "📅",
      color: "bg-blue-500",
    },
    {
      title: "Totala svar",
      value: companyData?.total_replies?.toString() || "0",
      icon: "💬",
      color: "bg-green-500",
    },
    {
      title: "Intresserade leads",
      value: companyData?.interested_leads?.toString() || "0",
      icon: "💼",
      color: "bg-yellow-500",
    },
    {
      title: "Bokade möten",
      value: companyData?.meetings_booked?.toString() || "0",
      icon: "📅",
      color: "bg-purple-500",
    },
    {
      title: "Genererade intäkter",
      value: `${companyData?.revenue || 0} kr`,
      icon: "💰",
      color: "bg-yellow-500",
    },
    {
      title: "Öppningsfrekvens",
      value: `${companyData?.open_rate || 0}%`,
      icon: "📊",
      color: "bg-red-500",
    },
    {
      title: "Klickfrekvens",
      value: `${companyData?.click_rate || 0}%`,
      icon: "🖱️",
      color: "bg-orange-500",
    },
    {
      title: "Studsfrekvens",
      value: `${companyData?.bounce_rate || 0}%`,
      icon: "📉",
      color: "bg-pink-500",
    },
    {
      title: "Avregistreringsfrekvens",
      value: `${companyData?.unsubscribe_rate || 0}%`,
      icon: "❌",
      color: "bg-gray-500",
    },
  ];

  const emailPerformanceData = companyData?.email_performance
    ? {
        labels: companyData.email_performance.labels || [],
        datasets: [
          {
            label: "Skickade e-postmeddelanden",
            data: companyData.email_performance.total_sent || [],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Mottagna svar",
            data: companyData.email_performance.total_replies || [],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      }
    : null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6">
        <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.indigo.600),theme(colors.blue.500),theme(colors.purple.400),theme(colors.blue.400))] bg-[length:200%_auto] bg-clip-text text-4xl font-semibold text-transparent mb-8">
          {selectedCampaign.company.name}
        </h1>

        <KPIWidgets widgets={kpiWidgets} />

        {emailPerformanceData ? (
          <Charts emailPerformanceData={emailPerformanceData} replyRateData={undefined} />
        ) : (
          <div>No email performance data available</div>
        )}

        <RecentActivity
          activities={[
            {
              message: "Kampanjen 'Vår 2024' genererade 100 leads idag.",
              icon: "📊",
              color: "text-green-500",
            },
          ]}
        />

        <Modal isOpen={false} onClose={() => {}} title="Modal Title">
          Modal Content
        </Modal>

        {/* Lägg till EmailManagement-komponenten längst ner */}
        <EmailManagement />
      </div>
    </div>
  );
}
