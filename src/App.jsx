import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Cover from "./components/Cover";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import HomeLayout from "./layout/HomeLayout";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const [count, setCount] = useState(0);

  const withLayout = (LayoutComponent, ChildComponent) => {
    return (props) => (
      <LayoutComponent>
        <ChildComponent {...props}></ChildComponent>
      </LayoutComponent>
    );
  };
  const HomeWithLayout = withLayout(HomeLayout, Cover);

  return (
    <>
      <HelmetProvider>
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<HomeWithLayout />}>
              <Route index element={<Cover />} />
              <Route path="detail">
                <Route index element={<Detail />} />
              </Route>
              <Route path="admin">
                <Route index element={<Admin />} />
              </Route>
              <Route path="login">
                <Route index element={<Login />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </HelmetProvider>
    </>
  );
}

export default App;
