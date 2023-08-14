import Head from "next/head";
import { fetchExperiences, fetchPosts } from "@utils/data-fetching";
import Cursor from "@components/Cursor/Cursor";
import Sidebar from "@components/Sidebar/Sidebar";
import Hero from "@components/Hero/Hero";
import Experience from "@components/Experience/Experience";
import Projects from "@components/Projects/Projects";
import Link from "next/link";

export default function Home({ experiences = [] }) {
  return (
    <>
      <Head>
        <title>Marko Malec - Web developer</title>
        <meta name="description" content="Created by Marko Malec" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cursor />
      <Sidebar />
      <Hero />
      <Experience data={experiences} />
      <Projects />
    </>
  );
}

export async function getServerSideProps() {
  const experiences = await fetchExperiences();
  const posts = await fetchPosts();

  return {
    props: {
      experiences,
      posts
    },
  };
}
