import { useState } from "react";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import type { AppRouter } from "../server/routes/app.route";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModalManager from "../components/Modals/ModalManager";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [modalOpen, setModal] = useState("");
  const [modalPayload, setModalPayload] = useState({});

  // add type MouseEventHandler<HTMLButtonElement> ?
  const openModal = (event: React.SyntheticEvent<EventTarget>) => {
    const {
      target: {
        dataset: { modal, payload },
      },
    } = event;
    // console.log("modal", modal, "payload", payload);
    if (modal) setModal(modal);
    if (payload) setModalPayload(payload);
  };

  const closeModal = () => {
    setModal("");
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SessionProvider session={session}>
        <div onClick={openModal}>
          <Navbar />
          <ModalManager
            closeFn={closeModal}
            modal={modalOpen}
            payload={modalPayload}
          />
          <Component {...pageProps} />
          <Footer />
        </div>
      </SessionProvider>
    </>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
