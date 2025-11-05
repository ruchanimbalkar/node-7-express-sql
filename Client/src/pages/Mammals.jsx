import Card from "../components/Card.jsx";
import { useState, useEffect } from "react";
export default function Mammals() {
  const [mammalData, setMammalData] = useState([]);
  const getMammalsData = async () => {
    try {
      const response = await fetch("/api/get-all-mammals");
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
        return;
      }
      const data = await response.json();
      console.log("data : ", data);
      console.table(data);
      setMammalData(data);
      console.log("typeof animalData : ", typeof animalData);
    } catch (error) {
      console.error("Error Fetching API : ", error.message);
    }
  };

  // write your useEffect here
  useEffect(() => {
    getMammalsData();
  }, []);
  return (
    <>
      <h2>Mammals</h2>
      <div className="card">
        {mammalData.map((mammal, index) => (
          <Card animal={mammal} key={"mammal_" + index} />
        ))}
      </div>
    </>
  );
}
