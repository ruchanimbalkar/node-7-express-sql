import { Routes, Route, Link } from "react-router-dom";
//import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Mammals from "./pages/Mammals";
import Insects from "./pages/Insects";
import Birds from "./pages/Birds";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [animalData, setAnimalData] = useState([]);

  const getAnimalsData = async () => {
    try {
      const response = await fetch("/api/get-all-animals");
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
        return;
      }
      const data = await response.json();
      console.log("data : ", data);
      console.table(data);
      setAnimalData(data);
      console.log("typeof animalData : ", typeof animalData);
    } catch (error) {
      console.error("Error Fetching API : ", error.message);
    }
  };

  // write your useEffect here
  useEffect(() => {
    getAnimalsData();
  }, []);

  return (
    <>
      <div>
        <h1>Animals API</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/mammals">Mammals</Link>
            </li>
            <li>
              <Link to="/insects">Insects</Link>
            </li>
            <li>
              <Link to="/birds">Birds</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home animalData={animalData} />} />
          <Route path="/about" element={<About />} />
          <Route path="/mammals" element={<Mammals />} />
          <Route path="/insects" element={<Insects />} />
          <Route path="/birds" element={<Birds />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
