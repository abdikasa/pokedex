import React from "react";
import PokemonTypes from "./PokemonTypes";
import Link from "./Link";
import PokemonImage from "./PokemonImage";
import { checkPokemonArray } from "../usefulFunctions";

const PokemonList = ({ pokemons, setSelectedPoke }) => {
  const onButtonClick = (event, data, href) => {
    event.preventDefault();
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    setSelectedPoke(data);
    window.history.pushState({}, "", href);
    //informs Route Component that url has changed.
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  const renderPokemon = () => {
    if (!checkPokemonArray(pokemons)) {
      return (
        <>
          <div style={{ margin: "0 auto" }}>
            <h1>Loading pokemon from the API, it will only be a moment.</h1>
          </div>
        </>
      );
    } else {
      return <>{pokeMap}</>;
    }
  };

  const pokeMap = pokemons
    .sort((a, b) => {
      return a.data.id - b.data.id;
    })
    .map(({ data }) => {
      return (
        <React.Fragment key={data.id}>
          <Link
            href={`/pokemon/${data.id}`}
            className={`five wide mobile three wide tablet two wide computer column ${data.types[0].type.name} poke-all ${data.name}`}
            onClick={(e) => onButtonClick(e, data, `/pokemon/${data.id}`)}
          >
            <div>
              <h2 id={"pkmn_name"}>{data.name}</h2>
              <div className="icons_poke">
                <div className="icons">
                  <PokemonTypes
                    types={data.types}
                    className="icon_wrap"
                  ></PokemonTypes>
                </div>
                <div className="poke">
                  <PokemonImage pokemon={data} className="thumb"></PokemonImage>
                </div>
              </div>
            </div>
          </Link>
        </React.Fragment>
      );
    });

  return <>{renderPokemon()}</>;
};

export default PokemonList;
