import Card from "../components/Card.jsx";
export default function Home({ animalData }) {
  //Delete one animal using id
  const deleteOneAnimal = async (id) => {
    await fetch(`api/delete-one-animal/${id}`, {
      method: "POST", // we need to say we're sending a POST request because by default it's always a GET request
      headers: {
        // the headers is where we put metadata about our request, including the data type that we pass in the body
        // in this case, we are saying we're passing in JSON data in the body
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
  };

  return (
    <>
      <div className="card">
        {animalData.map((animal, index) => (
          <Card
            animal={animal}
            key={"animal_" + index}
            handleClick={() => deleteOneAnimal(animal.id)}
          />
        ))}
      </div>
    </>
  );
}
