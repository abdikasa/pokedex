import { result } from "lodash";
import Pokeapi from "../api/Pokeapi";
import { getPokemon } from "../usefulFunctions";

export const getAbilities = () => async (dispatch, getState) => {
  const getAbility = (data) =>
    getState().selected.abilities.map((poke) => {
      return poke.ability[data];
    });

  let pokeAbilities = getAbility("name").map((ability) => {
    return Pokeapi.get(`/ability/${ability}`);
  });

  pokeAbilities = await Promise.all(pokeAbilities);

  pokeAbilities = pokeAbilities
    .map((ability) => ability.data["effect_entries"])
    .flat()
    .filter((ability) => ability.language.name === "en")
    .map((ability) => ability.effect);

  dispatch({
    type: "FETCH_ABILITIES",
    payload: {
      name: getAbility("name"),
      description: pokeAbilities,
    },
  });
};

function fetchPokemonHelper(id) {
  return new Promise((resolve, reject) => {
    return Pokeapi.get("/pokemon/" + id)
      .then((pokemon) => resolve(pokemon))
      .catch((err) => reject());
  });
}

export const fetchAll = (
  defaultList = Array.from({ length: 807 }, (_, i) => i + 1)
) => async (dispatch, getState) => {
  let arr = [];
  let result = defaultList.reduce((accumulatorPromise, nextID) => {
    return accumulatorPromise.then(() => {
      arr = arr.concat(fetchPokemonHelper(nextID));
      return arr;
    });
  }, Promise.resolve());

  result
    .then((res) => {
      return Promise.all(
        res.map((promise, index) => {
          return promise.then((poke) => poke.data).catch((err) => null);
        })
      );
    })
    .then((arr) => {
      dispatch({ type: "FETCH_ALL", payload: arr });
      if (getState().searched.length === 0) {
        dispatch({ type: "SEARCHED", payload: arr });
      }
    })
    .catch((err) => console.log("Something went wrong: " + err));

  // result.then(async () => {
  //   arr = (await Promise.all(arr)).map((pokemon) => pokemon.data);
  //   console.log("ran again", arr);
  //   dispatch({ type: "FETCH_ALL", payload: arr });
  //   if (getState().searched.length === 0) {
  //     dispatch({ type: "SEARCHED", payload: arr });
  //   }
  // });
};

// export const fetchAll = () => async (dispatch, getState) => {
//   const response = await Pokeapi.get(`/pokemon/?offset=0&limit=807`);
//   const unresolved = response.data.results.map((pokemon) =>
//     getPokemon(pokemon, "pokemon", /\/pokemon\/(\d+)\//)
//   );
//   const results = (await Promise.all(unresolved)).map(
//     (pokemon) => pokemon.data
//   );
//   console.log(results);
//   dispatch({ type: "FETCH_ALL", payload: results });

//   if (getState().searched.length === 0) {
//     dispatch({ type: "SEARCHED", payload: results });
//   }
// };

export const fetchBioEvolution = () => async (dispatch, getState) => {
  if (!getState().selected.id) {
    let hash = window.location.pathname.split("/")[2];
    if (hash.length > 0 && hash.length <= 3) {
      if (+hash > 0 && +hash <= 807) {
        hash = Number(hash);
        await dispatch(iChooseYouNew(hash));
      }
    }
  }
  await dispatch(fetchBio());
  console.log(
    "We have successfully fetched the bio of the pokemon",
    getState().bio
  );
  let evolution = getState().bio.evolution_chain;
  console.log("We are about to fetch the evolution now", evolution);

  //get evolution
  await dispatch(
    fetchEvolution(Number(evolution.url.match(/\/evolution-chain\/(\d+)\//)[1]))
  );
  console.log("We have fetched the evolution now", getState().evolution);
};

export const fetchEvolution = (url) => async (dispatch) => {
  const response = await Pokeapi.get(`/evolution-chain/${url}`);
  dispatch({ type: "FETCH_EVOLUTION", payload: response.data });
};

export const fetchBio = () => async (dispatch, getState) => {
  const response = await Pokeapi.get(
    "/pokemon-species/" + getState().selected.id
  );
  dispatch({ type: "FETCH_BIO", payload: response.data });
};

export const iChooseYou = (event, data, href) => async (dispatch) => {
  event.preventDefault();
  if (event.metaKey || event.ctrlKey) {
    return;
  }

  window.history.pushState({}, "", href);
  const navEvent = new PopStateEvent("popstate");
  window.dispatchEvent(navEvent);
  dispatch({ type: "SELECTED", payload: data });
  dispatch({ type: "FETCH_BIO", payload: {} });
  dispatch({ type: "FETCH_EVOLUTION", payload: {} });
};

export const iChooseYouNew = (hash) => async (dispatch) => {
  const response = await Pokeapi.get("/pokemon/" + hash);
  dispatch({ type: "SELECTED", payload: response.data });
};

export const setChartData = (chartObject) => (dispatch) => {
  dispatch({ type: "setChart", payload: chartObject });
};

export const setSearch = (q) => (dispatch, getState) => {
  let searched = [...getState().getAll].filter((pokemon) => {
    return pokemon.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
  });

  dispatch({ type: "SEARCHED", payload: searched });
};
