import { Box, Grid, styled } from "@mui/material";

const PageGrid = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "auto",
  alignSelf: "baseline",
  marginBottom: "3rem",
  height: "100%",
});

const PageGridItem = styled(Grid)({
  display: "flex",
  alignItems: "center",
  height: "100%",
});

export const BaseGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageGrid container>
      <PageGridItem item xs={12} md={8}>
        {children}
      </PageGridItem>
    </PageGrid>
  );
};
