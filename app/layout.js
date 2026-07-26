import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "SDB DIGITAL",
  description: "Watch Ads & Earn Real Cash",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Adsterra Script */}
        <Script
          src="https://pl30547412.effectivecpmnetwork.com/ed/ce/1b/edce1b721d95433fad8dabd17a955294.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
