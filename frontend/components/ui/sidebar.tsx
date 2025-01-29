"use client"; // Används för client-side rendering i Next.js

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo"; // Säkerställ att denna komponent finns
import { useUser } from "@/contexts/UserContext"; // Korrekt importväg för UserContext
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  EnvelopeIcon,
  ChartBarSquareIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"; // Säkerställ att @heroicons är installerat

export default function Sidebar({
  onToggle,
}: {
  onToggle: (isExpanded: boolean) => void;
}) {
  const { profile } = useUser();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  // Hjälpfunktion för att avgöra om en länk är aktiv
  const isActive = (href: string) => pathname === href;

  // Uppdatera föräldrarlayouten när sidebaren expanderas eller kollapsas
  useEffect(() => {
    onToggle(isExpanded);
  }, [isExpanded, onToggle]);

  return (
    <aside
      className={`${
        isExpanded ? "w-64" : "w-14"
      } bg-gray-800 text-white hidden sm:flex flex-col justify-between h-screen transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logotyp och DEMO-etikett */}
      <div>
        <div className="flex items-center p-3">
          <Logo />
          {/* Text för 'Vendux' synlig endast när sidebaren expanderas */}
          <div
            className={`ml-3 text-white text-2xl font-semibold transition-opacity duration-300 ${
              isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
            } whitespace-nowrap`} 
          >
            Vendux
          </div>
        </div>

        {/* Gula rutan visas alltid, men texten 'DEMO' visas endast när sidebaren expanderas */}
        <div
          className={`text-sm bg-yellow-500 font-semibold px-2 py-1 rounded transition-all duration-300 ${
            isExpanded ? "text-gray-800" : "text-transparent"
          }`}
        >
          DEMO
        </div>

        <nav className="mt-10 space-y-2">
          {profile?.role === "SuperAdmin" ? (
            <>
              {/* Länkar specifika för SuperAdmin */}
              <Link
                href="/dashboard"
                className={`flex items-center py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out ${
                  isActive("/dashboard")
                    ? "bg-indigo-600 text-white"
                    : "text-indigo-200/65 hover:bg-indigo-600 hover:text-white"
                }`}
              >
                {/* Ikonen är alltid synlig */}
                <ChartBarSquareIcon className="h-6 w-6" />
                {/* Texten visas endast när sidebaren är expanderad */}
                <span
                  className={`ml-3 transition-opacity duration-300 ${
                    isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
                  } whitespace-nowrap`}
                >
                  Översikt-Admin
                </span>
              </Link>

              <Link
                href="/kampanjer"
                className={`flex items-center py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out ${
                  isActive("/kampanjer")
                    ? "bg-indigo-600 text-white"
                    : "text-indigo-200/65 hover:bg-indigo-600 hover:text-white"
                }`}
              >
                <HomeIcon className="h-6 w-6" />
                <span
                  className={`ml-3 transition-opacity duration-300 ${
                    isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
                  } whitespace-nowrap`}
                >
                  Kampanjer
                </span>
              </Link>
            </>
          ) : profile?.role === "Client" ? (
            <>
              {/* Länkar specifika för Client */}
              <Link
                href="/kampanj"
                className={`flex items-center py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out ${
                  isActive("/kampanj")
                    ? "bg-indigo-600 text-white"
                    : "text-indigo-200/65 hover:bg-indigo-600 hover:text-white"
                }`}
              >
                <HomeIcon className="h-6 w-6" />
                <span
                  className={`ml-3 transition-opacity duration-300 ${
                    isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
                  } whitespace-nowrap`}
                >
                  Översikt
                </span>
              </Link>
            </>
          ) : null}

          {/* Gemensam länk: E-postmallar */}
          <Link
            href="/email"
            className={`flex items-center py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out ${
              isActive("/email")
                ? "bg-indigo-600 text-white"
                : "text-indigo-200/65 hover:bg-indigo-600 hover:text-white"
            }`}
          >
            <EnvelopeIcon className="h-6 w-6" />
            <span
              className={`ml-3 transition-opacity duration-300 ${
                isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
              } whitespace-nowrap`}
            >
              E-postmallar
            </span>
          </Link>
        </nav>
      </div>

      {/* Logga ut sektion */}
      <div className="p-4">
        <Link
          href="/logout"
          className="flex items-center py-2 px-4 text-indigo-200/65 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-300"
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
          <span
            className={`ml-3 transition-opacity duration-300 ${
              isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
            } whitespace-nowrap`}
          >
            Logga ut
          </span>
        </Link>
      </div>
    </aside>
  );
}
