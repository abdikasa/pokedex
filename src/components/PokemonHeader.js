import React, { lazy, Suspense } from "react";
import PokemonTabs from "./PokemonTabs";
import { pad, capitalize } from "../usefulFunctions";
import { Palette } from "react-palette";

const Link = lazy(() => import("./Link"));
const PokemonImage = lazy(() => import("./PokemonImage"));
const PokemonTypes = lazy(() => import("./PokemonTypes"));

class PokemonHeader extends React.Component {
  renderContent = () => {
    console.log(
      "inside pokemon header, what is the value of the props pokemon",
      this.props.pokemon
    );

    const [poke, bio, species] = this.props.pokemon;
    let { flavor_text_entries: flavor } = bio;
    let { genera } = bio;
    genera = genera
      .filter((genus) => genus.language.name === "en")
      .map((genera) => genera.genus)[0];

    flavor = flavor
      .filter(({ language }) => language.name === "en")
      .map((text) => text.flavor_text)
      .filter((text, i, arr) => {
        return arr.indexOf(text) === i;
      })
      .slice(0, 5)
      .map((text, index) => {
        text = text.split(/\s+/).join(" ");
        return <p key={text + index}>{text}</p>;
      });

    return (
      <React.Fragment>
        <Palette
          src={poke["sprites"]["other"]["official-artwork"]["front_default"]}
        >
          {({ data, loading, error }) => (
            <div
              className={`center-x column`}
              style={{ backgroundColor: data["darkVibrant"] ?? data["muted"] }}
            >
              <Suspense fallback={<div></div>}>
                <Link
                  href={`/`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (e.metaKey || e.ctrlKey) {
                      return;
                    }
                    window.history.pushState({}, "", "/");
                    //informs Route Component that url has changed.
                    const navEvent = new PopStateEvent("popstate");
                    window.dispatchEvent(navEvent);
                  }}
                >
                  <div
                    style={{ margin: "1rem" }}
                    className="ui icon buttons back-btn"
                  >
                    <button className="ui button">
                      <i className="left chevron icon"></i>
                    </button>
                  </div>
                </Link>
              </Suspense>
              <div className="d-flex mt name_id">
                <h1>{capitalize(poke.name)}</h1>
                <h2>
                  N<span>º</span>
                  {pad(poke.id)}
                </h2>
              </div>
              <Suspense
                fallback={
                  <div className="ui active centered inline loader"></div>
                }
              >
                <PokemonImage
                  pokemon={poke}
                  className={`ui medium image pkmn-header-img body`}
                ></PokemonImage>
              </Suspense>
              <div className="p-body">
                <div className={`mt header_types`}>
                  <Suspense
                    fallback={
                      <div className="ui active centered inline loader"></div>
                    }
                  >
                    <PokemonTypes
                      types={poke.types}
                      className={`ui label type`}
                    ></PokemonTypes>
                  </Suspense>
                </div>
                <div className="mt">
                  <PokemonTabs
                    tabs={[].concat({ poke, genera, flavor, bio, species })}
                  ></PokemonTabs>
                </div>
              </div>
            </div>
          )}
        </Palette>
      </React.Fragment>
    );
  };

  render() {
    return this.renderContent();
  }
}

export default PokemonHeader;
