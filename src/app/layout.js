import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./compoenents/Header/header";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import Head from "next/head";

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

  openGraph: {
    title: "Dev Promote",
    description: "Promoting Talents",
    url: "https://devpromote.online/",
    siteName: "Dev Promote",
    images: [
      {
        url: "/web.png", // Replace with your actual image path
        width: 1200,
        height: 630,
        alt: "Dev Promote - Promoting Talents",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Promote",
    description: "Promoting Talents",
    images: ["/web.png"], // Replace with your actual image path
  },
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
      <html lang="en">
        <body className={inter.className}>
          <div>
            <Head>
              <meta property="og:image" content="/web.png" />
              <meta
                name="google-site-verification"
                content="lALUSjFAU671QZjns2bN_i-g4K2v-aWbF_QP0nek9qE"
              />
              {/* Twitter Card metadata */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta
                name="twitter:title"
                content="How to Create a Dynamic Sitemap in Next.js for Better SEO"
              />
              <meta
                name="twitter:description"
                content="A step-by-step guide to improve your Next.js website's SEO with a dynamic sitemap."
              />
              <meta name="twitter:image" content="https://devpromote.online" />

              {/* Canonical URL */}
              <link rel="canonical" href="https://devpromote.online" />
              <meta
                name="google-site-verification"
                content="lALUSjFAU671QZjns2bN_i-g4K2v-aWbF_QP0nek9qE"
              />
              <meta property="og:title" content="Dev Promote is the future" />
              <meta
                property="og:description"
                content="Dev Promote helps you to find a job and promote free"
              />
              <meta property="og:type" content="article" />

              <meta property="og:locale" content="en_US" />
            </Head>
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
