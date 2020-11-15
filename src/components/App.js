import { useState, useEffect, lazy, Suspense } from "react";
import Pokeapi from "../api/Pokeapi";
import "../css/all.css";
import "../types-imgs/type_style.css";
import PokeProfile from "./PokeProfile";
const Search = lazy(() => import("./Search"));
const Route = lazy(() => import("./Route"));
const PokemonList = lazy(() => import("./PokemonList"));

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
      <Suspense fallback={<div></div>}>
        <Route path={`/`}>
          <>
            <Suspense fallback={<div />}>
              <div style={{ marginTop: "2rem" }}>
                <h1>Pokédex</h1>
                <Search
                  className="ui fluid icon input search pkmn_search"
                  onSearch={search}
                ></Search>
              </div>
            </Suspense>
            <div className="ui grid pokedex-container grid">
              <Suspense
                fallback={
                  <div className="ui center aligned segment">
                    Loading all pokemon...
                  </div>
                }
              >
                <PokemonList
                  pokemons={pokemons}
                  setSelectedPoke={setSelectedPoke}
                ></PokemonList>
              </Suspense>
            </div>
          </>
        </Route>
      </Suspense>
      <Route path={`/pokemon`}>
        <Suspense fallback={<div></div>}>
          <PokeProfile pokemon={selectedPoke}></PokeProfile>
        </Suspense>
      </Route>
    </div>
  );
};

export default App;
