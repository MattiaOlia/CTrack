import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SingleCoin from "./pages/SingleCoin";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path=":id" element={<SingleCoin />} />
    </Routes>
  );
}

export default App;
