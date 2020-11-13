import React, { useState, useEffect } from "react";
import Pokeapi from "../api/Pokeapi";
import PokemonHeader from "./PokemonHeader";
import Spinner from "./Spinner";

const PokeProfile = ({ pokemon }) => {
  const [poke, setPoke] = useState(null);
  console.log(pokemon);

  let hash = window.location.pathname.split("/");
  if (hash.length === 3) {
    hash = Number(hash[2]);
  }

  const getIdFromUrl = (url) => {
    return Number(url.match(/\/evolution-chain\/(\d+)\//)[1]);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  const validate = () => {
    if (pokemon === null) {
      if (typeof Number(hash) === "number") {
        if (Number(hash) > 0 && Number(hash) <= 807) {
          return false;
        }
        return true;
      }
      return true;
    } else {
      return false;
    }
  };

  const pkmnSpecies = () => {
    const bio = Pokeapi.get(`/pokemon-species/${hash}`);
    return Promise.resolve(bio);
  };

  const loadPokemon = async () => {
    let bio = pkmnSpecies();
    bio = await bio;
    let selectedPokemon,
      evolChain = null;
    if (bio.data.evolution_chain) {
      evolChain = await Pokeapi.get(
        `/evolution-chain/${getIdFromUrl(bio.data.evolution_chain.url)}`
      );
    }
    if (!pokemon) {
      selectedPokemon = await Pokeapi.get(`/pokemon/${hash}`);
      setPoke([].concat(selectedPokemon.data, bio.data, evolChain.data));
    } else {
      setPoke([].concat(pokemon, bio.data, evolChain.data));
    }
  };

  const renderContent = () => {
    if (poke === null) {
      console.log("spinning boiii");
      return <Spinner text="Loading Pokemon..."></Spinner>;
    } else {
      console.log("poke value", poke);
      return (
        <>
          <PokemonHeader pokemon={poke}></PokemonHeader>
        </>
      );
    }
  };

  return <>{renderContent()}</>;
};

export default PokeProfile;
