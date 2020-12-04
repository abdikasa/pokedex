import React, { Suspense } from "react";
import Route from "../Route";
import PokeProfile from "../PokeProfile";
import { connect } from "react-redux";

class RouteSelectedPokemon extends React.Component {
  render() {
    return (
      <Route path={`/pokemon`}>
        <Suspense fallback={<div></div>}>
          <div className="ui container">
            <PokeProfile pokemon={this.props.selectedPokemon}></PokeProfile>
          </div>
        </Suspense>
      </Route>
    );
  }
}

const mapStateToProps = (state) => {
  return { selectedPokemon: state.selected };
};

export default connect(mapStateToProps)(RouteSelectedPokemon);
