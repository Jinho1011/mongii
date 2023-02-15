import type { AppProps } from "next/app";
import "@/shared/styles/reset.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
