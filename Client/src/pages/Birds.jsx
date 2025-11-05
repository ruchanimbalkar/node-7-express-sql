import Card from "../components/Card.jsx";
import { useState, useEffect } from "react";
export default function Birds() {
  const [birdsData, setBirdsData] = useState([]);
  const getBirdsData = async () => {
    try {
      const response = await fetch("/api/get-all-birds");
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
        return;
      }
      const data = await response.json();
      console.log("data : ", data);
      console.table(data);
      setBirdsData(data);
      console.log("typeof animalData : ", typeof animalData);
    } catch (error) {
      console.error("Error Fetching API : ", error.message);
    }
  };

  // write your useEffect here
  useEffect(() => {
    getBirdsData();
  }, []);
  return (
    <>
      <h2>Birds</h2>
      <div className="card">
        {birdsData.map((bird, index) => (
          <Card animal={bird} key={"bird_" + index} />
        ))}
      </div>
    </>
  );
}
