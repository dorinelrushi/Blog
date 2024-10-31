import Head from "next/head";
import ListBlog from "./compoenents/Header/ListBlog";

export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:title" content="Dev Promote" />
        <meta property="og:image" content="/web.png" />
      </Head>
      <main>
        <ListBlog />
      </main>
    </>
  );
}
