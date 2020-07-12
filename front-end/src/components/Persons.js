import React from "react";

const Persons = ({ peopleToShow, handleDelete }) => {
  return (
    <div>
      {peopleToShow.map(({ name, number, id }) => (
        <p key={id}>
          {name} {number}{" "}
          <button onClick={() => handleDelete(id, name)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
