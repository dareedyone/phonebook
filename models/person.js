const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
const uniqueValidator = require("mongoose-unique-validator");
mongoose.set("useFindAndModify", false);

console.log("connecting to mongodb...", uri);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => console.log("Connected to MONGODB"))
  .catch((err) => console.log(err.message));

const personSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: String, required: true },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
