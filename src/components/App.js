import React, { useState, useEffect, lazy, Suspense } from "react";
import Pokeapi from "../api/Pokeapi";
import Route from "./Route";
import Search from "./Search";
import "../css/all.css";
import "../types-imgs/type_style.css";

const PokemonList = lazy(() => import("./PokemonList"));
const PokeProfile = lazy(() => import("./PokeProfile"));

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPoke, setSelectedPoke] = useState(null);
  const [allPokemon, setAll] = useState([]);
  let timer = null;
  useEffect(() => {
    loadPokemon();
  }, []);

  const search = (q) => {
    clearTimeout(timer);
    const searched = [...allPokemon].filter(
      (pokemon) => pokemon.data.name.indexOf(q) > -1
    );

    timer = setTimeout(() => {
      setPokemons(searched);
    }, 600);
  };

  let arr = [];
  const loadPokemon = (
    defaultList = Array.from({ length: 807 }, (_, i) => i + 1)
  ) => {
    function getPokemons(id) {
      return new Promise((resolve, reject) => {
        resolve(Pokeapi.get("/pokemon/" + id));
      });
    }

    let result = defaultList.reduce((accumulatorPromise, nextID) => {
      return accumulatorPromise.then(() => {
        arr = arr.concat(getPokemons(nextID));
        return arr;
      });
    }, Promise.resolve());

    result
      .then(() => {
        return Promise.all(arr);
      })
      .then((arr) => {
        setPokemons(arr);
        if (arr.length >= 807) {
          setAll(arr);
        }
      });
  };

  return (
    <div className="ui container">
      <Route path={`/`}>
        <>
          <div style={{ marginTop: "2rem" }}>
            <h1>Pokédex</h1>
            <Search
              className="ui fluid icon input search pkmn_search"
              onSearch={search}
            ></Search>
          </div>
          <div className="ui grid pokedex-container grid">
            <Suspense fallback={<div>Loading all pokemon...</div>}>
              <PokemonList
                pokemons={pokemons}
                setSelectedPoke={setSelectedPoke}
              ></PokemonList>
            </Suspense>
          </div>
        </>
      </Route>
      <Route path={`/pokemon`}>
        <Suspense fallback={<div>Loading pokemon...</div>}>
          <PokeProfile pokemon={selectedPoke}></PokeProfile>
        </Suspense>
      </Route>
    </div>
  );
};

export default App;
