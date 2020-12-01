import React, { useState, useEffect, lazy, Suspense } from "react";
import Pokeapi from "../api/Pokeapi";
import "../css/all.css";
import "../types-imgs/type_style.css";
import PokeProfile from "./PokeProfile";
const Search = lazy(() => import("./Search"));
const Route = lazy(() => import("./Route"));
const PokemonList = lazy(() => import("./PokemonList"));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemons: [], selectedPoke: null };
  }

  componentDidMount = () => {
    this.loadPokemon();
  };

  search = (q) => {
    let timer = null;
    clearTimeout(timer);
    const searched = [...this.state.pokemons].filter(
      (pokemon) => pokemon.data.name.toLowerCase().indexOf(q.toLowerCase()) > -1
    );

    timer = setTimeout(() => {
      this.setState({ pokemons: searched });
    }, 600);
  };

  loadPokemon = (defaultList = Array.from({ length: 2 }, (_, i) => i + 1)) => {
    let arr = [];

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
        //setPokemons(arr);
        this.setState({ pokemons: arr });
        // if (arr.length >= 807) {
        //   setAll(arr);
        // }
      });
  };

  render() {
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
                    onSearch={this.search}
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
                    pokemons={this.state.pokemons}
                    setSelectedPoke={(poke) =>
                      this.setState({ selectedPoke: poke })
                    }
                  ></PokemonList>
                </Suspense>
              </div>
            </>
          </Route>
        </Suspense>
        <Route path={`/pokemon`}>
          <Suspense fallback={<div></div>}>
            <PokeProfile pokemon={this.state.selectedPoke}></PokeProfile>
          </Suspense>
        </Route>
      </div>
    );
  }
}

export default App;
