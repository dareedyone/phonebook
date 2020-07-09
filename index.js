const express = require("express");
const app = express();
app.use(express.json());
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
  const person = { name, number, id: Math.floor(Math.random() * 324242442) };
  persons = persons.concat(person);
  res.json(person);
});

const PORT = 3001;

app.listen(PORT, () => console.log("Server is listening on port", PORT));
