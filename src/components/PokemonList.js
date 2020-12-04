import React, { lazy, Suspense } from "react";
import { checkPokemonArray } from "../usefulFunctions";

const Link = lazy(() => import("./Link"));
const PokemonImage = lazy(() => import("./PokemonImage"));
const PokemonTypes = lazy(() => import("./PokemonTypes"));

const PokemonList = ({ pokemons, setSelectedPoke }) => {
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
      return a.id - b.id;
    })
    .map((data) => {
      return (
        <Suspense
          key={data.id}
          fallback={<div className="ui active centered inline loader" />}
        >
          <React.Fragment>
            <Link
              href={`/pokemon/${data.id}`}
              className={`five wide mobile three wide tablet two wide computer column ${data.types[0].type.name} poke-all ${data.name}`}
              onClick={(e) => {
                setSelectedPoke(e, data, `/pokemon/${data.id}`);
              }}
            >
              <div>
                <h2 id={"pkmn_name"}>{data.name}</h2>
                <div className="icons_poke">
                  <div className="icons">
                    <Suspense
                      fallback={
                        <div className="ui active centered inline loader"></div>
                      }
                    >
                      <PokemonTypes
                        types={data.types}
                        className="icon_wrap"
                      ></PokemonTypes>
                    </Suspense>
                  </div>
                  <div className="poke">
                    <Suspense
                      fallback={
                        <div className="ui active centered inline loader"></div>
                      }
                    >
                      <PokemonImage
                        pokemon={data}
                        className="thumb"
                      ></PokemonImage>
                    </Suspense>
                  </div>
                </div>
              </div>
            </Link>
          </React.Fragment>
        </Suspense>
      );
    });

  return <>{renderPokemon()}</>;
};

export default PokemonList;
