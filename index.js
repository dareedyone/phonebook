const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
morgan.token("data", function getData(req) {
  const data = Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : "";
  return data;
});

app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :data")
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => res.json(persons));
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people <br> <br> ${new Date()}</p>`
  );
});
app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((person) => Number(req.params.id) === person.id);
  if (!person) return res.status(404).end();
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  persons = persons.filter((person) => person.id !== Number(req.params.id));
  res.status(204).end();
});
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name && !number)
    return res.status(400).json({ error: "name or number is missing !" });
  if (persons.find((person) => person.name === name))
    return res.status(409).json({ error: "name must be unique !" });
  const person = { name, number, id: Math.floor(Math.random() * 324242442) };
  persons = persons.concat(person);
  res.json(person);
});

app.use((req, res) => res.status(404).json({ error: "uh oh, not found !!" }));
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("Server is listening on port", PORT));
