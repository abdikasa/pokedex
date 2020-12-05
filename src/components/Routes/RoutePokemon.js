import React from "react";
import "../../css/all.css";
import "../../types-imgs/type_style.css";
import RoutePokemonList from "./RoutePokemonList";
import RouteSelectedPokemon from "./RouteSelectedPokemon";

class RoutePokemon extends React.Component {
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
