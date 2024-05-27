import WebFooter from "./Components/WebFooter";
import WebMain from "./Components/WebMain";
import FinalHeader from "./Components/Header/FinalHeader";
import { I18nextProvider } from "react-i18next";
import i18n from "./Components/Translation/i18n";
import useFont from "./Components/Header/UseFont";
function App() {
  useFont();
  return (
    <I18nextProvider i18n={i18n}>
      <FinalHeader />
      <WebMain />
      <WebFooter />
    </I18nextProvider>
  );
}

export default App;
