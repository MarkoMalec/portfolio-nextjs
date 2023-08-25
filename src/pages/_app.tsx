import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "~/styles/globals.scss";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const MyApp: React.FC<AppProps<{ session: Session | null }>> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
