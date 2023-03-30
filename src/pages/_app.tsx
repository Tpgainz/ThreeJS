import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClientSizeProvider } from "~/utils/ClientSize";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ClientSizeProvider>
      <Component {...pageProps} />
      </ClientSizeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
