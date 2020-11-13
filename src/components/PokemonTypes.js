import React from "react";
import Type from "./Type";

const PokemonTypes = ({ types, className = "" }) => {
  const pokeTypes = types.map((type, idx) => (
    <Type type={type} key={idx} className={className}></Type>
  ));
  return <>{pokeTypes}</>;
};

export default PokemonTypes;
