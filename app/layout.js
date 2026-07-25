import "./globals.css";

export const metadata = {
  title: "SDB DIGITAL",
  description: "Watch Ads & Earn Cash",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex justify-center">
        <div className="w-full max-w-md bg-slate-900 min-h-screen border-x border-slate-800 relative pb-20 shadow-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
