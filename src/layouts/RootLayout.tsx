import { Container, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router";
import Navigation from "../components/navigation/Navigation";
import theme from "./Theme";

const RootLayout = () => {
  console.log("This is root layout");
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default RootLayout;
