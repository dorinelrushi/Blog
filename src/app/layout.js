import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./compoenents/Header/header";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dev Promote",
  description: "Promoting Talents",
  keywords: [
    "dev",
    "promote",
    "dev promote",
    "jobs",
    "blog",
    "ai",
    "web dev",
    "dev",
    "chatgpt",
    "next js",
    "coding",
    "photoshop",
    "blockchain",
    "graphic designer",
    "Dev Promote",
    "AI",
  ],
  metadataBase: new URL("https://devpromote.online/"),
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {/* Google AdSense Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7525157885187689"
        crossorigin="anonymous"
      />
      <html lang="en">
        <body className={inter.className}>
          <div>
            <div>
              <Header />
            </div>
            {children}
            <Analytics />
          </div>
          {/* Google AdSense Ad Unit */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-7525157885187689"
              data-ad-slot="4189509172"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <Script id="ads-init" strategy="lazyOnload">
              {`
                 (adsbygoogle = window.adsbygoogle || []).push({});
              `}{" "}
            </Script>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
