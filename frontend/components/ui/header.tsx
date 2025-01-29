"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import Logo from "./logo";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // Get the current path

  // Define pages where the header should be hidden when logged in
  const hiddenPaths = ["/dashboard", "/email", "/kampanj", "/kampanjer"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // If logged in and the pathname matches one of the hidden paths, don't render the header
  if (isLoggedIn && hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                href="/signin"
                className="btn-sm bg-gradient-to-b from-gray-800 to-gray-800/60 text-gray-300"
              >
                Logga in
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="btn-sm bg-gradient-to-t from-indigo-600 to-indigo-500 text-white"
              >
                Begär åtkomst
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
