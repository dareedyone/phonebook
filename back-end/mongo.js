const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide password as an argument to: node mongo.js <password>"
  );
  process.exit(1);
}

const [_node, _pathFile, password, name, number] = process.argv;
const url = `mongodb+srv://fullstack:${password}@cluster0.ab3ci.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("mongdb connected")
);
const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (password && name && number) {
  const person = new Person({ name, number });
  person.save().then(({ name, number }) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else if (password) {
  Person.find({}).then((res) => {
    console.log("Phonebook:");
    res.forEach(({ name, number }) => {
      console.log(`${name} ${number}`);
    });
    mongoose.connection.close();
  });
}
