import Pokeapi from "../api/Pokeapi";

// const getPokemon = async (pokemon, path, regex) => {
//   const id = idToUrl(pokemon.url, regex);
//   await delay(100);
//   return Pokeapi.get(`/${path}/` + id);
// };

export const fecthAll = () => async (dispatch, getState) => {
  const response = Pokeapi.get(`/pokemon/?offset=0&limit=151`);

  const unresolved = response.data.results.map((pokemon) =>
    console.log(pokemon, "pokemon", /\/pokemon\/(\d+)\//)
  );

  const results = Promise.all(unresolved).map((pokemon) => pokemon.data);

  dispatch({ type: "FETCH_ALL", payload: results.data });
};
