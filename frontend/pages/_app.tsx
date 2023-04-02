import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Box } from "../components/Box";
import Navbar from "../components/NavbarComponent";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <Navbar />
        <Box
          css={{
            px: "$12",
            py: "$15",
            mt: "$12",
            "@xsMax": { px: "$10" },
            maxWidth: "1500px",
            margin: "0 auto",
          }}
        >
          <Component {...pageProps} />
        </Box>
      </NextUIProvider>
    </SessionProvider>
  );
}
