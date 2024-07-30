import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Cover from "./components/Cover";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <Cover />
    </>
  );
}

export default App;
