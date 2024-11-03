import Head from "next/head";
import ListBlog from "./compoenents/Header/ListBlog";

export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:title" content="Dev Promote" />
        <meta property="og:image" content="/web.png" />
        <meta
          name="google-site-verification"
          content="lALUSjFAU671QZjns2bN_i-g4K2v-aWbF_QP0nek9qE"
        />
      </Head>
      <main>
        <ListBlog />
      </main>
    </>
  );
}
