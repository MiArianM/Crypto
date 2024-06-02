// App.jsx
import WebFooter from "./Components/WebFooter";
import WebMain from "./Components/Main/WebMain";
import FinalHeader from "./Components/Header/FinalHeader";
import { I18nextProvider } from "react-i18next";
import i18n from "./Components/Translation/i18n";
import useFont from "./Components/Header/UseFont";
import { LoadingProvider } from "./Components/Loading/LoadingContext";
import Loading from "./Components/Loading/Loading";

function App() {
  useFont();
  return (
    <LoadingProvider>
      <I18nextProvider i18n={i18n}>
        <Loading />
        <FinalHeader />
        <WebMain />
        <WebFooter />
      </I18nextProvider>
    </LoadingProvider>
  );
}

export default App;
