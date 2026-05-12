import type { Metadata } from "next";
import "./globals.css";
import WhatsAppWidget from "@/components/whatsappwidget";
import Chatbot from "@/components/Chatbot"; // ⭐ ADD THIS

export const metadata: Metadata = {
  title: "Saydaliyya Pharmacy",
  description: "Your trusted online site, to get all medical supplies",
  keywords: [
    "pharmacy",
    "medical supplies",
    "healthcare",
    "online pharmacy",
    "medicine",
    "prescription drugs",
    "over-the-counter",
    "wellness",
    "health products",
    "medical store",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <main>{children}</main>

        {/* 💬 FLOATING CHATBOT (GLOBAL) */}
        <Chatbot />

        <WhatsAppWidget />

      </body>
    </html>
  );
}