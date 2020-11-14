import { capitalize } from "../usefulFunctions";

const PokemonAbility = ({ abilities }) => {
  let pkmnAbilities = () => {
    const array = [];
    for (let i = 0; i < abilities.length; i++) {
      let ability = Object.entries(abilities[i]);
      array.push(
        <div className="ui item ability_item" key={`ability-#${i}`}>
          <h3>{`${capitalize(ability[0][0])}`}</h3>
          <span>{ability[0][1]}</span>
        </div>
      );
    }
    return array;
  };

  return <>{pkmnAbilities()}</>;
};

export default PokemonAbility;
