import React, { lazy, Suspense } from "react";
import { checkForms, capitalize } from "../usefulFunctions";

const PokemonImage = lazy(() => import("./PokemonImage"));

const PokemonForms = ({ pokemon }) => {
  const allForms = checkForms();
  let id = pokemon[0].id;
  let forms;
  forms = allForms[0][id];

  console.log(forms);
  let formsMap = [];
  let className = "small";
  if (forms) {
    for (let k in forms) {
      k = capitalize(k).replaceAll("_", "-");
      if (k === "Giga") k = "Gigantamax";
      if (Object.keys(forms).length === 1) className = "medium";
      formsMap.push(
        <Suspense
          key={`${pokemon.name}-${k}-${pokemon.id}`}
          fallback={<div className="ui active centered inline loader"></div>}
        >
          <React.Fragment key={`${pokemon.name}-${k}-${pokemon.id}`}>
            <PokemonImage
              className={`ui ${className} image mr`}
              pokemon={pokemon[0]}
              forms={`-${k}`}
            ></PokemonImage>
          </React.Fragment>
        </Suspense>
      );
    }
  }

  const renderContent = () => {
    if (formsMap.length === 0) {
      return null;
    }
    return (
      <div key={Math.random() * 10000} className="mt">
        <div className="ui segment center aligned flex-column">
          <h1 className="ui label huge">Forms</h1>
          <div style={{ marginTop: "3rem" }}>{formsMap}</div>
        </div>
      </div>
    );
  };

  return renderContent();
};

export default PokemonForms;
