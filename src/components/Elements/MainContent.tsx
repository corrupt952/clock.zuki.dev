import { styled } from "@mui/material";

const StyledMainContent = styled("main")({
  display: "flex",
  alignItems: "center",
  justifyMainContent: "center",
  flex: "auto",
  padding: "8px",
  marginTop: "88px",
});

export const MainContent = ({ children }: { children: React.ReactNode }) => {
  return <StyledMainContent>{children}</StyledMainContent>;
};
