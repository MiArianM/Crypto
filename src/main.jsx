import ReactDOM from "react-dom/client";
import App from "./App.jsx";
const consoleError = console.error;
console.error = (message, ...args) => {
  if (message.includes("Support for defaultProps will be removed")) {
    return;
  }
  consoleError(message, ...args);
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
