import React from "react";
import { crossGenEvolve, isObjEmpty, displayPokemon } from "../usefulFunctions";

const fullEvolution = (evolution, running = []) => {
  //check truthy values only, allows empty object and arrays.
  if (evolution) {
    //Only 2 things can return: an object and an array.
    if (Array.isArray(evolution)) {
      //indeed evolution is an array, now check to see if its empty.
      if (isObjEmpty(evolution)) {
        return running.filter((value) => value !== null);
      }
      //pokemon only has one evolution in this stage.
      if (evolution.length === 1) {
        return fullEvolution(
          evolution[0].evolves_to,
          running.concat(evolution[0].species)
        );
      }
      //pokemon has more than one evolution in this stage.
      if (evolution.length > 1) {
        //To keep it recursive, I shifted out the first element
        //and passed along the next item in the array to the function.
        let copy = [...evolution];
        let first = copy.shift();
        return fullEvolution(
          copy,
          running.concat(
            first.species,
            first.evolves_to[0] === undefined
              ? null
              : first.evolves_to[0].species
          )
        );
      }
    } else {
      //indeed, evolution is not an array.
      if (isObjEmpty(evolution)) {
        //confirms that the object is empty.
        return running.filter((value) => value !== null);
      } else {
        //Checks if the object returns an array.
        return fullEvolution(
          evolution.evolves_to,
          running.concat(evolution.species)
        );
      }
    }
  }

  return running.filter((value) => value !== null);
};

const PokemonEvolution = ({ evolutionLine }) => {
  let evolution = fullEvolution(evolutionLine.chain);
  evolution = [...evolution].map((pokemon) => {
    return {
      name: pokemon.name,
      id: pokemon.url.match(/\/[\d]+\/$/)[0].split("/")[1],
    };
  });
  let showEvolution = [];

  showEvolution.push(Number(evolution[0].id));
  let consecutive = evolution.slice(1).map((pokemon) => Number(pokemon.id));
  let consecutiveRes = false;
  consecutive.reduce((a, b) => {
    if (a - b === -1) {
      showEvolution.push(b);
      consecutiveRes = true;
    } else {
      consecutiveRes = false;
    }
    return consecutiveRes ? b : 1;
  }, showEvolution[0]);

  // /window.location.hash.split("#")[1]
  let foundPokemon = evolution.findIndex((pokemon) => {
    return pokemon.id === window.location.pathname.split("/")[2];
  });

  const baby = evolutionLine.chain.species;
  console.log("baby", baby);
  console.log("evol line:", evolution);

  switch (Number(evolution.length)) {
    case 9:
      if (baby.name === evolution[foundPokemon].name) {
        showEvolution = displayPokemon(evolution, 7);
      } else {
        showEvolution = displayPokemon(
          [evolution[0], evolution[foundPokemon]],
          2
        );
      }
      break;
    case 5:
      //wrumple case
      if (baby.name === evolution[foundPokemon].name) {
        showEvolution = displayPokemon(
          [evolution.slice(0, 3), [evolution[0], ...evolution.slice(3)]],
          5
        );
      } else if (foundPokemon <= 2) {
        showEvolution = displayPokemon(evolution.slice(0, 3), 3);
      } else if (foundPokemon >= 3) {
        showEvolution = displayPokemon(
          evolution.slice(0, 1).concat(evolution.slice(3)),
          3
        );
      }
      break;
    case 4:
      if (
        [43, 44, 60, 61, 280, 281, 789, 790].includes(
          +evolution[foundPokemon].id
        )
      ) {
        showEvolution = displayPokemon(evolution, 7, 2);
      } else if (baby.name === evolution[foundPokemon].name) {
        if (Number(evolution[0].id) == Number(evolution[1].id) - 1) {
          showEvolution = displayPokemon(evolution, 4);
        } else {
          showEvolution = displayPokemon(evolution, 7);
        }
      } else if (
        showEvolution.length < evolution.length &&
        showEvolution.indexOf(Number(evolution[foundPokemon].id)) === 1
      ) {
        showEvolution = displayPokemon(evolution, 4);
      } else if (showEvolution.length === 1) {
        showEvolution = displayPokemon(
          evolution.slice(0, 1).concat(evolution[foundPokemon]),
          2
        );
      } else {
        showEvolution = displayPokemon(
          evolution.slice(0, 2).concat(evolution[foundPokemon]),
          3
        );
      }
      break;
    case 3:
      if (baby.name === evolution[foundPokemon].name) {
        if ([412, 79].includes(+evolution[foundPokemon].id)) {
          showEvolution = displayPokemon(evolution, 7);
        } else {
          showEvolution = displayPokemon(evolution, 3);
        }
      } else {
        if (crossGenEvolve.includes(Number(evolution[foundPokemon].id))) {
          showEvolution = displayPokemon(evolution, 3);
        } else if (showEvolution[2] == evolution[2].id) {
          showEvolution = displayPokemon(evolution, 3);
        } else if (
          showEvolution.indexOf(Number(evolution[foundPokemon].id)) >= 0
        ) {
          showEvolution = displayPokemon([evolution[0], evolution[1]], 2);
        } else {
          showEvolution = displayPokemon([evolution[0], evolution[2]], 2);
        }
      }
      break;
    case 2:
      showEvolution = displayPokemon(evolution, 2);
      break;
    case 1:
      showEvolution = displayPokemon([evolution[foundPokemon]], 1);
      break;
    default:
      console.log("Expected a default case, well here you go");
      break;
  }

  return (
    <React.Fragment key={Math.random() * 10000}>
      <div className="ui segment center aligned flex-column">
        <h1 className="ui label huge">Evolution Line</h1>
        <div style={{ marginTop: "3rem" }}>{showEvolution}</div>
      </div>
    </React.Fragment>
  );
};

export default PokemonEvolution;
