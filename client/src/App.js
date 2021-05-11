import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./component/Header";
import MainPage from "./screens/MainPage";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="container app">
          <Header />
          <MainPage />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
