"use client";

import { useState, useEffect } from "react";

interface EmailTemplate {
  id: number;
  name: string; // Email subject or title
  content: string; // Email body content
  lastEdited: string;
}

interface Email {
  id: number;
  sender: string;
  subject: string;
  body: string;
  date: string;
  read: boolean; // Indikerar om mailet har lästs
}

export default function EmailManagement() {
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate | null>(null);
  const [spamScore, setSpamScore] = useState<number>(0);
  const [emails, setEmails] = useState<Email[]>([]); // Inkommande mail
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null); // Valda mail
  const [replyContent, setReplyContent] = useState<string>(""); // Innehåll för svar

  useEffect(() => {
    // Simulerar hämtning av mail och email template från backend
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
    setSpamScore(0.5); // Exempel på spam score

    // Simulerade inkommande mail
    setEmails([
      {
        id: 1,
        sender: "john.doe@example.com",
        subject: "Welcome to Our Platform",
        body: "Hello! We wanted to reach out and welcome you to our platform...",
        date: "2024-09-17",
        read: false, // Oläst mail
      },
      {
        id: 2,
        sender: "jane.doe@example.com",
        subject: "Your Subscription is Expiring",
        body: "We noticed that your subscription is about to expire soon...",
        date: "2024-09-16",
        read: false, // Oläst mail
      },
    ]);
  }, []);

  const handleEmailClick = (email: Email) => {
    // Uppdaterar "read" status när ett mail klickas
    setEmails((prevEmails) =>
      prevEmails.map((e) =>
        e.id === email.id ? { ...e, read: true } : e
      )
    );
    setSelectedEmail(email);
  };

  const handleReply = () => {
    // Simulerar att skicka ett svar på mail
    alert(`Reply sent: ${replyContent}`);
    setReplyContent("");
  };

  return (
    <div className="p-6 bg-gray-100 text-black min-h-screen">
      {/* Mailcenter (Inbox) */}
      <div className="mb-10 bg-gray-300 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Inbox</h2>
        <div className="flex">
          {/* Inkommande mail lista */}
          <div className="w-1/3 bg-white shadow-md rounded-lg p-4 mr-4">
            <h3 className="text-lg font-semibold mb-4">Inkommande Mail</h3>
            <ul className="space-y-4">
              {emails.map((email) => (
                <li
                  key={email.id}
                  className={`cursor-pointer p-3 border-b border-gray-200 hover:bg-gray-100 ${
                    email.read ? "text-gray-500" : "font-bold"
                  }`} // Visuellt markera olästa mail med fetstil
                  onClick={() => handleEmailClick(email)}
                >
                  <p className="text-gray-800">{email.sender}</p>
                  <p className="text-sm">{email.subject}</p>
                  <p className="text-xs text-gray-500">{email.date}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Visning av valt mail */}
          {selectedEmail && (
            <div className="w-2/3 bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">{selectedEmail.subject}</h3>
              <p className="text-gray-800 mb-4">
                <strong>From:</strong> {selectedEmail.sender}
              </p>
              <p className="text-gray-800 mb-4">
                <strong>Date:</strong> {selectedEmail.date}
              </p>
              <p className="text-gray-800">{selectedEmail.body}</p>

              {/* Svara på mail */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Svara</h4>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  rows={4}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                ></textarea>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                  onClick={handleReply}
                >
                  Skicka svar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
