import { createTheme } from "@mui/material/styles";
import projectColor from "./project.color.json";

const muiTheme = createTheme({
  palette: {
    primary: Object.assign({}, projectColor.primary),
    textColor: Object.assign({}, projectColor.text),
    backgroundColor: Object.assign({}, projectColor.background),
    borderColor: Object.assign({}, projectColor.border),
    buttonColor: Object.assign({}, projectColor.button),
    boxShadow: Object.assign({}, projectColor.shadow),
  },
});

export default muiTheme;
