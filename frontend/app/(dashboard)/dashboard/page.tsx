"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";
import KPIWidgets from "@/components/admin/KPIWidgets";
import PerformanceGraphs from "@/components/admin/PerformanceGraphs";
import RecentActivity from "@/components/admin/RecentActivity";
import Modal from "@/components/ui/Modal"; // Importera modal
import { apiEndpoint } from '@/config/api';

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

// Registrera Chart.js-komponenter
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

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal-status
  const [modalTitle, setModalTitle] = useState(""); // Dynamisk modalrubrik
  const [modalContent, setModalContent] = useState<React.ReactNode>(null); // Dynamiskt modalinnehåll

  // Dummy-data för kampanjer med låga e-postlistor och bokade möten
  const lowEmailListCampaigns = [
    { name: "Kampanj A", emailsLeft: 300 },
    { name: "Kampanj B", emailsLeft: 400 },
  ];

  const meetingsBooked = [
    { name: "Företag A", meetings: 5 },
    { name: "Företag B", meetings: 3 },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/signin");
    } else {
      const verifyToken = async () => {
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
            setUser({ name: data.username, role: data.role });

            // Om användaren inte är SuperAdmin, omdirigera till /kampanj
            if (data.role !== "SuperAdmin") {
              router.push("/kampanj");
            }
          } else {
            router.push("/signin");
          }
        } catch (err) {
          setError("Kunde inte verifiera token, försök igen.");
          router.push("/signin");
        } finally {
          setIsLoading(false);
        }
      };
      verifyToken();
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-indigo-600">
        Laddar...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
        {error}
      </div>
    );
  }

  // Hantera modal för specifika widgets
  const handleWidgetClick = (widgetTitle: string) => {
    if (widgetTitle === "Låga E-postlistor (<500)") {
      setModalTitle("Kampanjer med låga e-postlistor");
      setModalContent(
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-indigo-700 font-semibold">
                Kampanjnamn
              </th>
              <th className="py-2 text-indigo-700 font-semibold">
                Återstående e-post
              </th>
            </tr>
          </thead>
          <tbody>
            {lowEmailListCampaigns.map((campaign, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-2 text-black">{campaign.name}</td>
                <td className="py-2 text-indigo-600 font-semibold">
                  {campaign.emailsLeft} e-post kvar
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (widgetTitle === "Bokade Möten") {
      setModalTitle("Bokade Möten");
      setModalContent(
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-indigo-700 font-semibold">Företag</th>
              <th className="py-2 text-indigo-700 font-semibold">
                Antal Möten
              </th>
            </tr>
          </thead>
          <tbody>
            {meetingsBooked.map((company, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-2 text-black">{company.name}</td>
                <td className="py-2 text-green-600 font-semibold">
                  {company.meetings} möten bokade
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    setIsModalOpen(true); // Öppna modal
  };

  // Data för KPIWidgets
  const kpiWidgets = [
    {
      title: "E-post skickade",
      value: "120,000",
      icon: "📧",
      color: "bg-indigo-500",
    },
    {
      title: "Leads hanterade",
      value: "35,000",
      icon: "💼",
      color: "bg-green-500",
    },
    {
      title: "Genererad inkomst",
      value: "1,500,000 kr",
      icon: "💰",
      color: "bg-yellow-500",
    },
    {
      title: "Bokade Möten",
      value: "500",
      icon: "📅",
      color: "bg-blue-500",
      onClick: () => handleWidgetClick("Bokade Möten"), // Lägg till onClick för att öppna modal
    },
    {
      title: "Låga E-postlistor (<500)",
      value: "2",
      icon: "⚠️",
      color: "bg-red-500",
      onClick: () => handleWidgetClick("Låga E-postlistor (<500)"), // Lägg till onClick för att öppna modal
    },
    { title: "Totala Kampanjer", value: "24", icon: "📊", color: "" },
    { title: "Aktiva Kampanjer", value: "10", icon: "🟢", color: "" },
    { title: "Pausade Kampanjer", value: "5", icon: "🟡", color: "" },
    { title: "Avslutade Kampanjer", value: "9", icon: "🔵", color: "" },
    { title: "Totala Svar", value: "1,500", icon: "📬", color: "" },
  ];

  const emailPerformanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun"],
    datasets: [
      {
        label: "E-post skickade",
        data: [120, 150, 180, 220, 300, 450],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Mottagna svar",
        data: [50, 70, 90, 150, 200, 300],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const replyRateData = {
    labels: ["Svarat", "Inte Svarat"],
    datasets: [{ data: [1200, 300], backgroundColor: ["#4CAF50", "#FF5252"] }],
  };

  const activities = [
    {
      message: 'Kampanjen "Sommar 2024" skickade 500 e-postmeddelanden idag.',
      icon: "📧",
      color: "text-indigo-500",
    },
    {
      message: "Lead John Doe svarade på ditt e-postmeddelande.",
      icon: "💼",
      color: "text-green-500",
    },
    {
      message: "Du bokade 5 möten den här veckan.",
      icon: "📅",
      color: "text-blue-500",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Huvudinnehåll */}
      <div className="flex-1 p-6">
        <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.indigo.600),theme(colors.blue.500),theme(colors.purple.400),theme(colors.blue.400))] bg-[length:200%_auto] bg-clip-text text-4xl font-semibold text-transparent mb-8">
          Admin Dashboard - Välkommen tillbaka, {user?.name}!
        </h1>

        {/* KPI Widgets */}
        <KPIWidgets widgets={kpiWidgets} />

        {/* Prestandagrafer för Kampanjer */}
        <PerformanceGraphs
          emailPerformanceData={emailPerformanceData}
          replyRateData={replyRateData}
        />

        {/* Senaste Aktiviteter */}
        <RecentActivity activities={activities} />

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalTitle}
        >
          {modalContent}
        </Modal>
      </div>
    </div>
  );
}
