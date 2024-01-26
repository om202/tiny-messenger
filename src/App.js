import store from "./state/store";
import { Provider } from "react-redux";
import "./App.css";
import Talk from "./pages/Talk";

function App() {
  return (
    <Provider store={store}>
      <div className="main-app-container">
        <Talk />
      </div>
    </Provider>
  );
}

export default App;
