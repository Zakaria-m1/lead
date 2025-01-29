"use client";

import { useState, useEffect } from "react";

interface EmailTemplate {
  id: number;
  name: string; // Email subject or title
  content: string; // Email body content
  lastEdited: string;
}

export default function EmailManagement() {
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate | null>(null);
  const [spamScore, setSpamScore] = useState<number>(0);

  useEffect(() => {
    // Simulera hämtning av e-postmall och spam score från backend
    setEmailTemplate({
      id: 1,
      name: "Welcome to Our Service!",
      content: `
        <p>Hello [First Name],</p>
        <p>We are excited to have you with us. Here's some exciting news for you...</p>
        <p>Best regards,<br>Team XYZ</p>
      `,
      lastEdited: "2024-09-12",
    });
    setSpamScore(0.5); // Exempel på spam score från backend
  }, []);

  if (!emailTemplate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 text-black min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-indigo-700">Email Template Overview</h1>
      <p className="text-gray-600 mb-8">View your email template and monitor its spam score in real-time.</p>

      {/* Display Email Template as an A4-like preview */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Email Template</h2>

        <div className="flex justify-center">
          <div className="bg-white shadow-xl rounded-lg p-8 border border-gray-300" style={{ height: "auto", width: "850px" }}>
            {/* Email Template Subject (Header Section) */}
            <div className="bg-white-100 text-indigo-800 px-6 py-4 rounded-t-lg mb-4 shadow-sm border-b border-indigo-200">
              <h3 className="text-2xl font-bold text-center">{emailTemplate.name}</h3>
            </div>

            {/* Email Template Body (Content Section) */}
            <div className="px-6 py-8 text-gray-800 leading-relaxed bg-white rounded-b-lg">
              <div dangerouslySetInnerHTML={{ __html: emailTemplate.content }} />
            </div>
          </div>
        </div>
      </div>

      {/* Visa Spam Score */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold">Spam Score</h2>
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200">
                  Spam Score
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-yellow-600">{spamScore}</span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200">
              <div
                style={{ width: `${(spamScore / 10) * 100}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full ${
                  spamScore <= 3 ? "bg-green-500" : spamScore <= 6 ? "bg-orange-500" : "bg-red-500"
                }`}
              ></div>
            </div>
            <p className="text-sm text-gray-800">Spam score measures the likelihood of your emails landing in spam. Keep it low for better delivery rates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
