import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { getAll, create, destroy, replace } from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [peopleToShow, setPeopleToShow] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [message, setmessage] = useState("");

  useEffect(() => {
    getAll()
      .then((res) => {
        setPersons(res);
        setPeopleToShow(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const found = persons.find(({ name }) => name === newName);
    if (found) {
      // return alert(`${newName} is already added to phonebook`);
      let confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one ?`
      );
      return (
        confirm &&
        replace(found.id, newPerson)
          .then((res) => {
            setPeopleToShow(
              peopleToShow
                .filter((person) => person.id !== found.id)
                .concat(res)
            );
            setPersons(
              persons.filter((person) => person.id !== found.id).concat(res)
            );
            setNewName("");
            setNewNumber("");
            setmessage({
              text: "Number changed successfully !",
              type: "success",
            });
            setTimeout(() => {
              setmessage("");
            }, 5000);
          })
          .catch(() => {
            setmessage({
              text: `Information of ${found.name} have already been removed from the server !`,
              type: "error",
            });
            setTimeout(() => {
              setmessage("");
            }, 5000);
          })
      );
    }

    create(newPerson).then((res) => {
      setPeopleToShow(peopleToShow.concat(res));
      setPersons(persons.concat(res));
      setNewName("");
      setNewNumber("");
      setmessage({ text: "Number added successfully !", type: "success" });
      setTimeout(() => {
        setmessage("");
      }, 5000);
    });
  };
  const handleDelete = (id, name) => {
    const extract = (arr) => arr.filter((person) => person.id !== id);
    window.confirm(`Delete ${name} ?`) &&
      destroy(id).then(() => {
        setPeopleToShow(extract(peopleToShow));
        setPersons(extract(persons));
      });
  };

  const doFiltering = (e) => {
    setNewFilter(e.target.value);
    const re = new RegExp(newFilter, "i");
    const match = persons.filter((person) => re.test(person.name));
    match.length > 0 ? setPeopleToShow(match) : setPeopleToShow(persons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter newFilter={newFilter} doFiltering={doFiltering} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons peopleToShow={peopleToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
