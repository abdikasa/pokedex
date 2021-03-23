import { Children } from "react";

const imageId = (id) => pad(id);

const pad = (number) => {
  let str = "" + number;
  while (str.length < 3) {
    str = "0" + str;
  }
  return str;
};

const PokemonImage = ({
  className = "",
  pokemon,
  handleClick = null,
  forms = "",
  children,
}) => {
  const imageFolder = className.includes("thumb") ? "thumb" : "body";

  if (+pokemon.id === 487) {
    if (imageFolder === "body") {
      pokemon.id = pokemon.id + "-Origin";
    }
  }
  let image =
    imageFolder === "thumb"
      ? `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${imageId(
          pokemon.id
        )}${forms}.png`
      : `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${imageId(
          pokemon.id
        )}${forms}.png`;

  return (
    <div className={className} key={pokemon.id}>
      <img
        src={
          imageFolder === "thumb"
            ? require(`../pokemon_imgs/pokemon-${imageFolder}-webp/${imageId(
                pokemon.id
              )}${forms}.webp`).default
            : image
        }
        onError={(e) => {
          e.target.onerror = null;
          // e.target.src = require(`../pokemon_imgs/pokemon-${imageFolder}/${imageId(
          //   pokemon.id
          // )}.jpg`).default;
          e.target.src = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${imageId(
            pokemon.id
          )}.png`;
        }}
        alt={"An image of " + pokemon.name}
        onClick={handleClick}
        loading="lazy"
      />
      {children}
    </div>
  );
};

export default PokemonImage;
