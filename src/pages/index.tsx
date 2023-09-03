import Head from "next/head";
import {
  fetchExperiences,
  fetchPosts,
  fetchProjects,
} from "@utils/data-fetching";
import Cursor from "@components/Cursor/Cursor";
import Sidebar from "@components/Sidebar/Sidebar";
import Hero from "@components/Hero/Hero";
import Experience from "@components/Experience/Experience";
import Projects from "@components/Projects/Projects";
import Stack from "@components/Stack/Stack";
import Footer from "@components/Footer/Footer";
import BlogHome from "~/components/BlogHome/BlogHome";

type Posts = {
  id: number;
  featuredPhoto: string;
  title: string;
  content: string;
};

type HomeProps = {
  experiences: [];
  projects: [];
  posts: Posts[];
};

export default function Home({
  experiences = [],
  projects = [],
  posts,
}: HomeProps) {
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
      <Projects projects={projects} />
      <Stack />
      <BlogHome posts={posts} />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const experiences = await fetchExperiences();
  const posts = await fetchPosts();
  const projects = await fetchProjects();

  return {
    props: {
      experiences,
      posts,
      projects,
    },
    revalidate: 300,
  };
}
