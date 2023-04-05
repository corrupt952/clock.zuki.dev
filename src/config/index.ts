import { alpha, createTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Config = {
  title: "clock",
  theme: createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#0066ff",
      },
      secondary: {
        main: "#ff9900",
      },
      background: {
        default: "#212121",
        paper: "#212121",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "::-webkit-scrollbar": {
            width: "16px",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: alpha("#efefef", 0.3),
            borderRadius: "10px",
          },
        },
      },
    },
  }),
  navigation: {
    items: [
      {
        icon: GitHubIcon,
        name: "GitHub",
        href: "https://github.com/corrupt952/clock.zuki.dev",
      },
    ],
  },
};
