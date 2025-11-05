import Card from "../components/Card.jsx";
export default function Home({ animalData }) {
  return (
    <>
      <div className="card">
        {animalData.map((animal, index) => (
          <Card animal={animal} key={"animal_" + index} />
        ))}
      </div>
    </>
  );
}
