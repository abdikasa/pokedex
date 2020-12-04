import React from "react";
import "../../css/all.css";
import "../../types-imgs/type_style.css";
import RoutePokemonList from "./RoutePokemonList";
import RouteSelectedPokemon from "./RouteSelectedPokemon";
// const Search = lazy(() => import("./Search"));
// const PokemonList = lazy(() => import("./PokemonList"));

class RoutePokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemons: [], selectedPoke: null };
  }

  componentDidMount = () => {};

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

  render() {
    return (
      <React.Fragment>
        <RoutePokemonList></RoutePokemonList>
        <RouteSelectedPokemon></RouteSelectedPokemon>
      </React.Fragment>
    );
  }
}

export default RoutePokemon;
