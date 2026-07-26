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
        {/* Monetag Script */}
        <Script
          src="https://quge5.com/88/tag.min.js"
          data-zone="263857"
          async
          data-cfasync="false"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
