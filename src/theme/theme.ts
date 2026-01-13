import { createTheme } from "@mui/material";
import { MuiButtonOverrides } from "./overrides/MuiButton";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#10a16a",
    },
  },
  components: {
    MuiButton: MuiButtonOverrides,
  },
});
