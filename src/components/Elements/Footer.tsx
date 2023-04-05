import { styled, Typography } from "@mui/material";
import React from "react";
import { LinkText } from "./LinkText";

const StyledFooter = styled("footer")({
  flex: "none",
  padding: 8,
  textAlign: "center",
});

const DeveloeprLink = () => {
  return (
    <LinkText href="https://zuki.dev" target="_blank">
      K@zuki.
    </LinkText>
  );
};

export const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="body2" color="textSecondary" align="center">
        {`@ 2023- `}
        <DeveloeprLink />
        {` All rights reserved.`}
      </Typography>
    </StyledFooter>
  );
};
