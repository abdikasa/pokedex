import React, { useEffect, useState } from "react";
import { capitalize } from "../usefulFunctions.js";
import PokemonAbility from "./PokemonAbility";
import Pokeapi from "../api/Pokeapi";

const PokemonAbilities = ({ pokemon }) => {
  const [abilities, setAbilities] = useState(null);
  const getAbility = (data) =>
    pokemon.abilities.map((poke) => {
      return poke.ability[data];
    });

  useEffect(() => {
    let mounted = true;
    let pokeAbilities = getAbility("name");
    const getAbilityDesc = async () => {
      let data = await Promise.all(
        pokeAbilities.map((ability) => {
          return Pokeapi.get(`/ability/${ability}`);
        })
      );
      data = data
        .map((ability) => ability.data["effect_entries"])
        .flat()
        .filter((ability) => ability.language.name === "en")
        .map((ability) => ability.effect);
      if (mounted) {
        setAbilities({ name: getAbility("name"), description: data });
      }
    };
    getAbilityDesc();

    return () => (mounted = false);
  }, []);

  const renderContent = () => {
    if (!abilities) {
      return null;
    } else {
      let array = [];
      for (let i = 0; i < abilities.name.length; i++) {
        let result = {};
        result[abilities.name[i]] = abilities.description[i];
        array.push(result);
      }

      return (
        <>
          <PokemonAbility abilities={array}></PokemonAbility>
        </>
      );
    }
  };

  return (
    <div className={`ui segment center aligned pokemon_abilites`}>
      <h3>{capitalize(pokemon.name)}'s Abilities</h3>
      <div className="ui items">{renderContent()}</div>
    </div>
  );
};

export default PokemonAbilities;
