import React from "react";

const Filter = ({ newFilter, doFiltering }) => (
  <div>
    Filter shown with: <input value={newFilter} onChange={doFiltering} />
  </div>
);

export default Filter;
