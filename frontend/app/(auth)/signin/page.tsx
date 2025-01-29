"use client"; // Markerar denna komponent som en klientkomponent

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Uppdatering för att använda 'next/navigation'
import { apiEndpoint } from '@/config/api';

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(apiEndpoint('auth/login'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Response Data: ", data); // Log the response to check the structure

      if (response.ok) {
        // Log the token structure to verify it exists
        console.log("Token received: ", data.access); // Adjust this based on the actual response structure

        // Spara token i localStorage eller sessionStorage
        localStorage.setItem("token", data.access); // Adjust to match your actual response token key

        // Omdirigera till skyddad rutt (exempelvis dashboard)
        router.push("/dashboard");
      } else {
        setError(data.message || "Felaktiga inloggningsuppgifter.");
      }
    } catch (err) {
      setError("Ett oväntat fel inträffade. Försök igen senare.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Sektionens rubrik */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Välkommen tillbaka
            </h1>
          </div>
          {/* Kontaktformulär */}
          <form onSubmit={handleLogin} className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="username"
                >
                  Användarnamn
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-input w-full"
                  placeholder="Ditt användarnamn"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between gap-3">
                  <label
                    className="block text-sm font-medium text-indigo-200/65"
                    htmlFor="password"
                  >
                    Lösenord
                  </label>
                  <Link
                    className="text-sm text-gray-600 hover:underline"
                    href="/reset-password"
                  >
                    Glömt?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full"
                  placeholder="Ditt lösenord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            <div className="mt-6 space-y-5">
              <button
                type="submit"
                className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                disabled={loading}
              >
                {loading ? "Loggar in..." : "Logga in"}
              </button>
              <div className="flex items-center gap-3 text-center text-sm italic text-gray-600 before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-gradient-to-r after:from-transparent after:via-gray-400/25">
                eller
              </div>
              <button
                className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                type="button"
              >
                Logga in med Google
              </button>
            </div>
          </form>
          {/* Länk längst ner */}
          <div className="mt-6 text-center text-sm text-indigo-200/65">
            Har du inget konto?{" "}
            <Link className="font-medium text-indigo-500" href="/signup">
              Skapa ett konto
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
