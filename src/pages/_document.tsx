import { styled } from "@mui/material";
import { Html, Head, Main, NextScript } from "next/document";

const Body = styled("body")({
  overflowY: "scroll",
});

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Body>
        <NextScript />
        <Main />
      </Body>
    </Html>
  );
}
