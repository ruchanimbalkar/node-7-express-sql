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
  const data = await db.query(`SELECT * FROM animals WHERE name = '${name}'`);
  console.log(data);
  // I tried this for the basic query that gives us all columns : let animal = data.rows.find((animal) => animal.name === name);
  let animal = data.rows;
  console.log(animal);
  //return animal
  return animal;
};

// 3. getOneAnimalById(id)
const getOneAnimalById = async (id) => {
  const data = await db.query(`SELECT * FROM animals WHERE id=${id}`);
  let animal = data.rows;
  //return animal
  return animal;
};

// 4. getNewestAnimal()
const getNewestAnimal = async () => {
  const data = await db.query("SELECT * FROM animals ORDER BY id DESC LIMIT 1");
  let animal = data.rows;
  //return animal
  return animal;
};

// 5. deleteOneAnimal(id)
const deleteOneAnimal = async (id) => {
  const data = await db.query(
    `DELETE FROM animals WHERE id =${id} RETURNING *`
  );
  let deletedAnimal = data.rows;
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
// 5. POST /delete-one-animal/:id

// 6. POST /add-one-animal

// 7. POST /update-one-animal-name

// 8. POST /update-one-animal-category
