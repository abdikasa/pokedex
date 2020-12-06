import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { fetchAll, iChooseYou, setSearch } from "../../action";

const Search = lazy(() => import("../Search"));
const Route = lazy(() => import("../Route"));
const PokemonList = lazy(() => import("../PokemonList"));

class RoutePokemonList extends React.Component {
  componentDidMount = () => {
    (async () => {
      this.props.fetchAll();
      //this.props.setSearch("");
    })();
  };

  search = (timer, q) => {
    // let pokemans = this.props.fetchedPokemon.filter((pokemon) => {
    //   return pokemon.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
    // });
    this.props.setSearch(timer, q);
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
                    pokemons={this.props.searched}
                    setSelectedPoke={this.props.iChooseYou}
                  ></PokemonList>
                </Suspense>
              </div>
            </>
          </Route>
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { fetchedPokemon: state.getAll, searched: state.searched };
};

export default connect(mapStateToProps, { fetchAll, iChooseYou, setSearch })(
  RoutePokemonList
);
