require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const Person = require("./models/person");
const opts = { runValidators: true };
app.use(express.static("build"));
app.use(cors());
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

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => res.json(people));
});
app.get("/info", (req, res) => {
  Person.find({}).then((people) =>
    res.send(
      `<p>Phonebook has info for ${
        people.length
      } people <br> <br> ${new Date()}</p>`
    )
  );
});
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) return res.json(person);
      res.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const {
    body: { name, number },
    params: { id },
  } = req;
  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true }
  )
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  new Person({ name, number })
    .save()
    .then((person) => res.json(person))
    .catch((err) => next(err));
});

app.use((req, res) => res.status(404).json({ error: "uh oh, not found !" }));

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  const errorName = err.name;
  if (errorName === "castError")
    return res.status(400).send({ error: "malformatted id" });
  if (errorName === "ValidationError")
    return res.status(400).send({ error: err });
  next(err);
};

app.use(errorHandler);

app.listen(PORT, () => console.log("Server is listening on port", PORT));
