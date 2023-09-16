import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import DashboardLayout from "@Dashboard/layout";
import "~/styles/globals.scss";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Transition from "@components/Transition/Transition";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@components/Layout/Layout";
import Head from "next/head";

const queryClient = new QueryClient();

const MyApp: React.FC<AppProps<{ session: Session | null }>> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  const routerino = useRouter();

  const isDashboardRoute = (pathname: string) => {
    return pathname.startsWith("/dashboard");
  };

  if (isDashboardRoute(router.pathname)) {
    return (
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </QueryClientProvider>
      </SessionProvider>
    );
  }
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta
            property="og:image"
            content="https://utfs.io/f/ac32a312-1b8a-42db-a01c-369ed91646dc_IMG_20221001_152017_204.jpg"
          />
        </Head>
        <Layout>
          <AnimatePresence mode="wait">
            <motion.div key={routerino.route} className="motion_transition_div">
              <Transition />
            </motion.div>
            <Component {...pageProps} />
          </AnimatePresence>
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
