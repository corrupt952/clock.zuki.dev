import { Footer, Header, MainContent } from "@/components/Elements";
import { Config } from "@/config";
import "@/styles/globals.css";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Config.theme}>
        <CssBaseline />
        <Header />
        <MainContent>
          <Component {...pageProps} />
        </MainContent>
        <Footer />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
