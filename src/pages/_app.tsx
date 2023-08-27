import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import DashboardLayout from "@Dashboard/layout";
import "~/styles/globals.scss";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const MyApp: React.FC<AppProps<{ session: Session | null }>> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
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
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
