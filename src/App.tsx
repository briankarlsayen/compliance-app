import { Container, MuiThemeProvider } from "@material-ui/core";
import oneplaceTheme from "./theme/oneplace-theme";
import CheckLists from "./pages/Checklists";

export default function App() {
  return (
    // <KeycloakProvider>
    <MuiThemeProvider theme={oneplaceTheme}>
      <Container maxWidth={false}>
        <CheckLists />
      </Container>
    </MuiThemeProvider>
    // </KeycloakProvider>
  );
}
