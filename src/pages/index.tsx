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

export default function Home({ experiences, projects, posts }: HomeProps) {
  return (
    <>
      <Head>
        <title>Marko Malec - Web developer</title>
        <meta property='og:description' content='Portfolio created by Marko Malec.'/>
        <meta property="og:image" content="https://utfs.io/f/ac32a312-1b8a-42db-a01c-369ed91646dc_IMG_20221001_152017_204.jpg" />
        <meta property="og:url" content="https://markomalec.com" />
        <meta property='og:image:width' content='926' />
        <meta property='og:image:height' content='926' />
        <meta property="og:type" content='website' />
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
  const experiences: ExperienceType[] = await fetchExperiences();
  const posts: Post[] = await fetchPosts();
  const projects: Project[] = await fetchProjects();

  return {
    props: {
      experiences,
      posts,
      projects,
    },
    revalidate: 300,
  };
}
