import { Components, Theme } from "@mui/material";

export const MuiButtonOverrides: Components<Theme>["MuiButton"] = {
  styleOverrides: {
    root: {
      textTransform: "none",
      fontSize: "16px",
      borderRadius: 999,
    },
    text: {
      textDecoration: "underline",
      borderRadius: 0,
    },
  },
};
