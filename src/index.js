// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

//Importing all of our node modules
import express from "express"; // the framework that lets us build webservers
import pg from "pg"; //pg stands for postgreSQL, for connecting to the database
import config from "./config.js"; //importing the connection string to our database hoste don NEON

//connecting to our PostgreSQL database , or db for short
const db = new pg.Pool({
  //new pg.Pool creates a connection to the database
  connectionString: config.databaseUrl, //this is the credentials to access the database. Keep private
  ssl: true, // use SSL encryption when connecting to the database to keep data safe in transit
});

//Declare a variable named app and call the express() function to create a new instance of express so we can use all of the methods, fucntions, properties of express
// which will be saved in app
const app = express(); // this gives us access to all of Express's functions, methods, useful superpowers

//Defining out port number
//What port should our server listen to?
const port = 3000; // you can use any port # but developers commonly use 3000. also there are some port numbers you cannot use

//Declaring that this server will be receiving and responding to requests in JSON
app.use(express.json()); // this server will receive and respond to requests with JSON data

//Turn on our server so that it can listen for requests and respond to those requests at our port #
//Hello you are on , listen to requests and respond to those requests
app.listen(port, () => {
  console.log(`Server is listening on port #${port}`);
}); //this method is turning on our server

app.get("/", (req, res) => {
  res.send("Hi, Sever is ON!");
});
// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllAnimals()
const getAllAnimals = async () => {
  //Read all animals data from NEON database
  //db.query() lets us query the SQL database
  //It takes in one parameter :  a SQL query!
  const data = await db.query("SELECT * FROM animals");
  console.log(data.rows);
  return data.rows;
};

// 2. getOneAnimalByName(name)
const getOneAnimalByName = async (name) => {
  //template literal method is not secure :
  //const data = await db.query(`SELECT * FROM animals WHERE name = '${name}'`);
  //placeholder method is safer method (minimizes the risk of SQL injection) :
  const data = await db.query("SELECT * FROM animals WHERE name = $1", [name]);
  console.log(data);
  // I tried this for the basic query that gives us all columns : let animal = data.rows.find((animal) => animal.name === name);
  let animal = data.rows[0];
  console.log(animal);
  //return animal
  return animal;
};

// 3. getOneAnimalById(id)
const getOneAnimalById = async (id) => {
  //placeholder method is safer method (minimizes the risk of SQL injection) :
  const data = await db.query("SELECT * FROM animals WHERE id = $1", [id]);
  let animal = data.rows[0];
  //return animal
  return animal;
};

// 4. getNewestAnimal()
const getNewestAnimal = async () => {
  const data = await db.query("SELECT * FROM animals ORDER BY id DESC LIMIT 1");
  let animal = data.rows[0];
  //return animal
  return animal;
};

//practice helper functions:
//Helper function for /get-all-mammals
const getAllMammals = async () => {
  const data = await db.query("SELECT * FROM animals WHERE category= 'mammal'");
  console.log(data.rows);
  return data.rows;
};

// Helper function for /get-animals-category/:category
const getAnimalsCategory = async (category) => {
  //placeholder method is safer method (minimizes the risk of SQL injection) :
  const data = await db.query("SELECT * FROM animals WHERE category = $1", [
    category,
  ]);
  let animals = data.rows[0];
  //return animals
  return animals;
};

// Helper function for /get-all-flying-animals
const getAllFlyingAnimals = async () => {
  const data = await db.query("SELECT * FROM animals WHERE can_fly = true");
  console.log(data.rows);
  return data.rows;
};

//Helper function for /get-all-land-mammals
const getAllLandMammals = async () => {
  const data = await db.query(
    "SELECT * FROM animals WHERE category= 'mammal' AND lives_in ='land'"
  );
  console.log(data.rows);
  return data.rows;
};

//Helper function for /get-all-water-mammals
const getAllWaterMammals = async () => {
  const data = await db.query(
    "SELECT * FROM animals WHERE category= 'mammal' AND lives_in ='water'"
  );
  console.log(data.rows);
  return data.rows;
};

//Helper function for /get-all-birds
const getAllBirds = async () => {
  const data = await db.query("SELECT * FROM animals WHERE category= 'bird'");
  console.log(data.rows);
  return data.rows;
};

//Helper function for /get-all-insects
const getAllInsects = async () => {
  const data = await db.query("SELECT * FROM animals WHERE category= 'insect'");
  console.log(data.rows);
  return data.rows;
};

// 5. deleteOneAnimal(id)
const deleteOneAnimal = async (id) => {
  const data = await db.query("DELETE FROM animals WHERE id = $1 RETURNING *", [
    id,
  ]);
  let deletedAnimal = data.rows[0];
  //return animal
  return deletedAnimal;
};

// 6. addOneAnimal(name, category, can_fly, lives_in)

// 7. updateOneAnimalName(id, newName)

// 8. updateOneAnimalCategory(id, newCategory)

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-animals
app.get("/get-all-animals", async (req, res) => {
  //Call the helper function
  let allAnimals = await getAllAnimals();
  //Send allAnimals in response JSON format
  res.json(allAnimals);
});

// 2. GET /get-one-animal-by-name/:name
app.get("/get-one-animal-by-name/:name", async (req, res) => {
  let name = req.params.name;
  const animal = await getOneAnimalByName(name);
  res.json(animal);
});
// 3. GET /get-one-animal-by-id/:id
app.get("/get-one-animal-by-id/:id", async (req, res) => {
  let id = req.params.id;
  const animal = await getOneAnimalById(id);
  res.json(animal);
});
// 4. GET /get-newest-animal
app.get("/get-newest-animal", async (req, res) => {
  const newAnimal = await getNewestAnimal();
  res.json(newAnimal);
});

//Practice =>

//Get /get-animals-category/:category
app.get("/get-animals-category/:category", async (req, res) => {
  let category = req.params.category;
  const animals = await getAnimalsCategory(category);
  res.json(animals);
});

//GET /get-all-mammals
app.get("/get-all-mammals", async (req, res) => {
  const mammals = await getAllMammals();
  res.json(mammals);
});

//GET /get-all-land-mammals
app.get("/get-all-land-mammals", async (req, res) => {
  const landMammals = await getAllLandMammals();
  res.json(landMammals);
});

//GET /get-all-flying-animals
app.get("/get-all-flying-animals", async (req, res) => {
  const flyingAnimals = await getAllFlyingAnimals();
  res.json(flyingAnimals);
});

//GET /get-all-insects
app.get("/get-all-insects", async (req, res) => {
  const insects = await getAllInsects();
  res.json(insects);
});

//GET /get-all-water-mammals
app.get("/get-all-water-mammals", async (req, res) => {
  const aquaMammals = await getAllWaterMammals();
  res.json(aquaMammals);
});

//GET /get-all-birds
app.get("/get-all-birds", async (req, res) => {
  const birds = await getAllBirds();
  res.json(birds);
});

// 5. POST /delete-one-animal/:id
app.post("/delete-one-animal/:id", async (req, res) => {
  let id = req.params.id;
  const animal = await deleteOneAnimal(id);
  res.json(animal);
});
// 6. POST /add-one-animal
app.post("/add-one-animal", async (req, res) => {});
// 7. POST /update-one-animal-name
app.post("/update-one-animal-name", async (req, res) => {});
// 8. POST /update-one-animal-category
app.post("/update-one-animal-category", async (req, res) => {});
