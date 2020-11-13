import React from "react";
import { imageId } from "../usefulFunctions.js";

const PokemonImage = ({
  className = "",
  pokemon,
  handleClick = null,
  forms = "",
}) => {
  const imageFolder = className.includes("thumb") ? "thumb" : "body";

  if (+pokemon.id === 487) {
    if (imageFolder === "body") {
      pokemon.id = pokemon.id + "-Origin";
    }
  }

  return (
    <div className={className} key={pokemon.id}>
      <img
        src={require(`../pokemon_imgs/pokemon-${imageFolder}-webp/${imageId(
          pokemon.id
        )}${forms}.webp`)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = require(`../pokemon_imgs/pokemon-${imageFolder}/${imageId(
            pokemon.id
          )}.png`);
        }}
        alt={"An image of " + pokemon.name}
        onClick={handleClick}
      />
    </div>
  );
};

export default PokemonImage;
