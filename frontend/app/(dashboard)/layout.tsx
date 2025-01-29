"use client";

import { CampaignProvider } from "@/contexts/CampaignContext"; // För WebSocket
import { UserProvider } from "@/contexts/UserContext"; // Wrap in UserProvider
import Sidebar from "@/components/ui/sidebar"; // Sidebar for authenticated users
import { useState, useEffect } from "react"; // Import useState for managing sidebar state

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mounted, setMounted] = useState(false); // Track if the component is mounted

  // Ensure the component is only rendered on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Do not render the layout on the server
  }

  return (
    <CampaignProvider>
      {" "}
      {/* WebSocket provider */}
      <UserProvider>
        {" "}
        {/* User context provider */}
        <html lang="en">
          <body className="bg-gray-950 font-inter text-base text-gray-200 antialiased min-h-screen">
            <div className="flex min-h-screen h-screen">
              {/* Sidebar with dynamic width */}
              <Sidebar onToggle={setSidebarExpanded} />

              {/* Main content area dynamically adjusts based on sidebar's state */}
              <div
                className={`${
                  sidebarExpanded ? "ml-21" : "ml-0"
                } flex-1 flex flex-col transition-all duration-300`}
              >
                {/* Ensure flex-grow is applied properly to fill space */}
                <div className="flex-1 flex flex-col overflow-y-auto">
                  {children}
                </div>
              </div>
            </div>
          </body>
        </html>
      </UserProvider>
    </CampaignProvider>
  );
}
