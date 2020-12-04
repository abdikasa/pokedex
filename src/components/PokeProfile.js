import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { iChooseYouNew, fetchBioEvolution } from "../action";

const Spinner = lazy(() => import("./Spinner"));
const PokemonHeader = lazy(() => import("./PokemonHeader"));

class PokeProfile extends React.Component {
  componentDidMount = () => {
    if (this.checkIfObjectEmpty(this.props.pokemon)) {
      let hash = window.location.pathname.split("/")[2];
      if (hash.length > 0 && hash.length <= 3) {
        if (+hash > 0 && +hash <= 807) {
          hash = Number(hash);
          this.props.iChooseYouNew(hash);
          this.props.fetchBioEvolution();
        } else {
          return;
        }
      }
    } else {
      this.props.fetchBioEvolution();
    }
  };

  checkIfObject = (obj) => {
    return Object.keys(obj).length > 0 && obj.constructor === Object;
  };

  checkIfObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  renderContent = () => {
    let test = this.props.propPokemon.every(this.checkIfObject);
    if (!test) {
      return <Spinner text="Loading Pokemon..."></Spinner>;
    } else {
      return (
        <Suspense
          fallback={<div className="ui active centered inline loader"></div>}
        >
          <>
            <PokemonHeader pokemon={this.props.propPokemon}></PokemonHeader>
          </>
        </Suspense>
      );
    }
  };

  render() {
    return <>{this.renderContent()}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    propPokemon: [state.selected, state.bio, state.evolution],
  };
};

export default connect(mapStateToProps, { iChooseYouNew, fetchBioEvolution })(
  PokeProfile
);
