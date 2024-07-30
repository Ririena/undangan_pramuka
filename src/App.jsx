import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Cover from "./components/Cover";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Cover />} />
              <Route path="detail">
                <Route index element={<Detail />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
