import React from "react";
import { capitalize } from "../usefulFunctions.js";
import PokemonAbility from "./PokemonAbility";
import { getAbilities } from "../action";
import { connect } from "react-redux";

class PokemonAbilities extends React.Component {
  componentDidMount = () => {
    this.props.getAbilities();
  };

  renderContent = () => {
    const abilities = this.props.abilities;
    if (abilities.length === 0) {
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

  render() {
    return (
      <div className={`ui segment center aligned pokemon_abilites`}>
        <h3>{capitalize(this.props.pokemon.name)}'s Abilities</h3>
        <div className="ui items">{this.renderContent()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { abilities: state.abilities };
};

export default connect(mapStateToProps, { getAbilities })(PokemonAbilities);
