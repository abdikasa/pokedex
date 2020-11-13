import React from "react";
import Grass from "../types-imgs/grass.svg";
import Fire from "../types-imgs/fire.svg";
import Bug from "../types-imgs/bug.svg";
import Flying from "../types-imgs/flying.svg";
import Dragon from "../types-imgs/dragon.svg";
import Dark from "../types-imgs/dark.svg";
import Ground from "../types-imgs/ground.svg";
import Psychic from "../types-imgs/psychic.svg";
import Normal from "../types-imgs/normal.svg";
import Ice from "../types-imgs/ice.svg";
import Fairy from "../types-imgs/fairy.svg";
import Poison from "../types-imgs/poison.svg";
import Water from "../types-imgs/water.svg";
import Electric from "../types-imgs/electric.svg";
import Rock from "../types-imgs/rock.svg";
import Steel from "../types-imgs/steel.svg";
import Ghost from "../types-imgs/ghost.svg";
import Fighting from "../types-imgs/fighting.svg";

const Type = ({ type, className }) => {
  const capitalize = (name) =>
    name ? name[0].toUpperCase() + name.slice(1) : "";

  let passedType = null;
  if (typeof type === "object") {
    passedType = type.type.name;
  } else {
    passedType = type;
  }

  let color,
    pkmnType = null;
  if (className) {
    switch (passedType.toLowerCase()) {
      case "grass":
        color = "green";
        pkmnType = Grass;
        break;
      case "poison":
        color = "purple";
        pkmnType = Poison;
        break;
      case "bug":
        color = "olive";
        pkmnType = Bug;
        break;
      case "fire":
        color = "orange";
        pkmnType = Fire;
        break;
      case "flying":
        color = "teal";
        pkmnType = Flying;
        break;
      case "dragon":
        color = "violet";
        pkmnType = Dragon;
        break;
      case "dark":
        color = "grey";
        pkmnType = Dark;
        break;
      case "ground":
        color = "brown";
        pkmnType = Ground;
        break;
      case "psychic":
        color = "purple";
        pkmnType = Psychic;
        break;
      case "normal":
        color = "grey";
        pkmnType = Normal;
        break;
      case "ice":
        color = "teal";
        pkmnType = Ice;
        break;
      case "fairy":
        color = "pink";
        pkmnType = Fairy;
        break;
      case "water":
        color = "blue";
        pkmnType = Water;
        break;
      case "electric":
        color = "yellow";
        pkmnType = Electric;
        break;
      case "rock":
        color = "brown";
        pkmnType = Rock;
        break;
      case "steel":
        color = "grey";
        pkmnType = Steel;
        break;
      case "ghost":
        color = "black";
        pkmnType = Ghost;
        break;
      case "fighting":
        color = "brown";
        pkmnType = Fighting;
        break;
    }
  }

  return (
    <div className={`${className} ${color}`}>
      <img
        src={`${pkmnType}`}
        loading="lazy"
        alt={`${passedType} pokemon`}
      ></img>
      <span className={"pkmn_type_text"}>{capitalize(passedType)}</span>
    </div>
  );
};

export default Type;
