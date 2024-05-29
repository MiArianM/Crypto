import { AppProvider } from "./Context";
import Header from "./Header";


const FinalHeader = () => {
  return (
    <AppProvider>
      <Header />
    </AppProvider>
  );
};

export default FinalHeader;
