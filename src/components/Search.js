import { useState, useEffect } from "react";

const Search = ({ className, onSearch }) => {
  const [val, setVal] = useState("");

  return (
    <div className={className}>
      <input
        type="text"
        placeholder="Type pokemon name"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <i className="search icon"></i>
    </div>
  );
};

export default Search;
