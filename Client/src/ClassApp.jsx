// ------------------
// IMPORT STATEMENTS
// ------------------

import { useState, useEffect } from "react";
import "./App.css";
import { MdDelete } from "react-icons/md";

// ------------------
// FUNCTION DECLARATION
// ------------------

function App() {
  // ------------------
  // STATE VARIABLES
  // ------------------

  const [animals, setAnimals] = useState(null);

  // ------------------
  // HELPER FUNCTIONS
  // ------------------

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

  const getAllAnimals = async () => {
    const response = await fetch("/api/get-all-animals");
    const data = await response.json();
    console.log(data);
    setAnimals(data);
  };

  // ------------------
  // EFFECTS
  // ------------------

  useEffect(() => {
    getAllAnimals();
  }, []);

  // ------------------
  // RENDERING JSX TO THE SCREEN
  // ------------------

  return (
    <>
      <h1>🐾 Full-Stack Animals App 🐾</h1>
      <div className="card">
        <h2>All Animals</h2>
        <div className="animals">
          {animals?.map((animal) => (
            <div className="animal" key={animal.id}>
              <h2>{animal.name}</h2>
              <p>Id: {animal.id}</p>
              <p>Category: {animal.category}</p>
              <p>Lives in: {animal.lives_in}</p>
              <p>Can fly: {animal.can_fly ? "True ✅" : "False ❌"}</p>
              <button
                onClick={() => {
                  deleteOneAnimal(animal.id);
                }}
              >
                {" "}
                Delete Animal <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ------------------
// EXPORT STATEMENT
// ------------------

export default App;
