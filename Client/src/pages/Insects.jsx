import Card from "../components/Card.jsx";
import { useState, useEffect } from "react";
export default function Insects() {
  const [insectData, setInsectData] = useState([]);
  const getInsectsData = async () => {
    try {
      const response = await fetch("/api/get-all-insects");
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
        return;
      }
      const data = await response.json();
      console.log("data : ", data);
      console.table(data);
      setInsectData(data);
      console.log("typeof animalData : ", typeof animalData);
    } catch (error) {
      console.error("Error Fetching API : ", error.message);
    }
  };

  // write your useEffect here
  useEffect(() => {
    getInsectsData();
  }, []);
  return (
    <>
      <h2>Insects</h2>
      <div className="card">
        {insectData.map((insect, index) => (
          <Card animal={insect} key={"insect_" + index} />
        ))}
      </div>
    </>
  );
}
