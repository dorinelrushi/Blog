import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./compoenents/Header/header";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dev Promote | Promote yourself",
  description:
    "Promoting Talents | Learning Coding | Become the best developer ",

  openGraph: {
    images: [
      {
        url: "/web.png", // Replace with your actual image path
        width: 1000,
        height: 630,
        alt: "Dev Promote - Promoting Talents",
      },
    ],
  },

  other: [
    {
      name: "google-site-verification",
      content: "lALUSjFAU671QZjns2bN_i-g4K2v-aWbF_QP0nek9qE",
    },
  ],
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
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Q9Z5872YNG"
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q9Z5872YNG');
            `,
        }}
      />
      <Script
        src="https://cdn.userway.org/widget.js"
        data-account="cIsC2ofFXp"
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
