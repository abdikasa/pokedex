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
}) => {
  const imageFolder = className.includes("thumb") ? "thumb" : "body";

  console.log("pokemon prop", pokemon);

  if (+pokemon.id === 487) {
    if (imageFolder === "body") {
      pokemon.id = pokemon.id + "-Origin";
    }
  }

  return (
    <div className={className} key={pokemon.id}>
      <img
        src={
          require(`../pokemon_imgs/pokemon-${imageFolder}-webp/${imageId(
            pokemon.id
          )}${forms}.webp`).default
        }
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = require(`../pokemon_imgs/pokemon-${imageFolder}/${imageId(
            pokemon.id
          )}.jpg`).default;
        }}
        alt={"An image of " + pokemon.name}
        onClick={handleClick}
        loading="lazy"
      />
    </div>
  );
};

export default PokemonImage;
