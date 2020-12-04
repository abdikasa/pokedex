import { lazy, Suspense } from "react";
import allTypes from "../allTypes";
import { mergeDupes, capitalize, getTypes } from "../usefulFunctions";

const PokemonTypes = lazy(() => import("./PokemonTypes"));

const PokeWRI = ({ poke, headerText = "" }) => {
  let myTypes = getTypes(poke, allTypes());
  let myTypesR = mergeDupes(myTypes.map((type) => type["resist"]));
  let myTypesW = mergeDupes(myTypes.map((type) => type["weakTo"]));
  let myTypesI = mergeDupes(myTypes.map((type) => type["no_dmg_from"])).filter(
    (type) => type !== undefined
  );

  switch (headerText) {
    case "":
      break;
    case "R":
      headerText = "Resistances";
      myTypes = mergeDupes(myTypesR.concat(myTypesW))
        .filter((pokeType) => myTypesW.indexOf(pokeType) <= -1)
        .sort();
      break;
    case "W":
      headerText = "Weaknesses";
      myTypes = [...myTypesW].filter(
        (item) => myTypesR.indexOf(item) < 0 && myTypesI.indexOf(item) <= -1
      );
      break;
    case "I":
      headerText = "Immunities";
      myTypes = myTypesI;
      break;
    default:
      break;
  }

  const checkIfEmpty = (array) => {
    if (array.length === 0) {
      return (
        <span style={{ fontSize: "1.3rem" }}>
          This pokemon has no {headerText.toLowerCase()}.
        </span>
      );
    }
    return (
      <Suspense
        fallback={<div className="ui active centered inline loader"></div>}
      >
        <PokemonTypes
          types={myTypes}
          className="ui label type wri"
        ></PokemonTypes>
      </Suspense>
    );
  };

  return (
    <div className="ui segment center aligned">
      <h3>
        {capitalize(poke.name)}'s {headerText}
      </h3>
      {checkIfEmpty(myTypes)}
    </div>
  );
};

export default PokeWRI;
