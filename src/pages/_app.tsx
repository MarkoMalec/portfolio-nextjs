import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import DashboardLayout from "@Dashboard/layout";
import "~/styles/globals.scss";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Transition from "@components/Transition/Transition";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

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
        <AnimatePresence mode="wait">
          <motion.div key={routerino.route} className="motion_transition_div">
            <Transition />
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
