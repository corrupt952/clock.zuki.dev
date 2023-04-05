import { Config } from "@/config";
import { Link, styled } from "@mui/material";
import { forwardRef } from "react";

const linkOptions = {
  textDecoration: "none",
  color: Config.theme.palette.secondary.main,
  ":hover": {
    textDecoration: "underline",
    filter: "brightness(50%)",
  },
};

const StyledLink = styled(Link)(linkOptions);

// TODO: anyを何とかする
export const LinkText = forwardRef<HTMLAnchorElement, any>(function _LinkText(
  props,
  ref
) {
  const { href, ...linkProps } = props;
  let uri = href || "/";
  let target = "_self";
  let rel = "noopener noreferrer";

  if (!uri.startsWith("/")) {
    target = "_blank";
  }

  return (
    <StyledLink {...linkProps} href={uri} ref={ref} target={target} rel={rel} />
  );
});
