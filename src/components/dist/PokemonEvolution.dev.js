"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _usefulFunctions = require("../usefulFunctions");

var _PokemonImage = _interopRequireDefault(require("./PokemonImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function fullEvolution(arr, base) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var running = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  console.log("arr", arr);
  console.log("base", base);
  return arr;
} //   //check if object is returned and can be used for
//   //the following methods
//   function isObjEmpty(obj) {
//     for (let prop in obj) {
//       if (obj.hasOwnProperty(prop)) return false;
//     }
//     return true;
//   }
//   //Get the pokeid of pre-evolution (if any).
//   //First we get the url and we split it to get the pokeId.
//   function babyEvol(evolution) {
//     let babyE = [];
//     let i = 0;
//     while (!isObjEmpty(evolution[i])) {
//       babyE.push(evolution[i].species.url);
//       i++;
//     }
//     babyE = babyE.map((url) => {
//       return convertURLTOID(url);
//     });
//     return babyE;
//   }
//   //Get the evolution from stage 1 to 2 and even to stage 3.
//   //The function returns the pokemon name or id of each stage found in an array.
//   function evol1to2(evolution, baby, key) {
//     let i = 0;
//     let pkmn = { chain: [] };
//     while (!isObjEmpty(evolution[i])) {
//       //there is at least one evolution.
//       let next = evolution[i].species[key];
//       if (!isObjEmpty(evolution[i].evolves_to)) {
//         //if true, pokemon has at least 2 evolutions.
//         let j = 0;
//         while (!isObjEmpty(evolution[i].evolves_to[j])) {
//           let final = evolution[i].evolves_to[j].species[key];
//           pkmn.chain.push({ baby: baby[key], next, final });
//           j++;
//         }
//       } else {
//         pkmn.chain.push({ baby: baby[key], next });
//       }
//       i++;
//     }
//     return pkmn.chain;
//   }
//   //Very important function; used to determine the proper
//   //sequence of the evolution chain. Some pokemon have branched
//   //evolutions. Ex: A => b => (C or D)
//   //but at let's say at D, it would not make sense for C to show up in the chain since it is branched.
//   var groupBy = function (xs, key) {
//     return xs.reduce(function (rv, x) {
//       (rv[x[key]] = rv[x[key]] || []).push(x);
//       return rv;
//     }, {});
//   };
//   //Converts the url of the api call and returns the pokeid.
//   //Can take an array or an url.
//   function convertURLTOID(url) {
//     let regex = /[/](\d)+[/]/;
//     if (typeof url == "string") {
//       return regex.exec(url)[0].split("/")[1];
//     } else {
//       url.forEach((url) => {
//         for (let key in url) {
//           url[key] = convertURLTOID(url[key]);
//         }
//       });
//       return url;
//     }
//   }
//   function getEvolution(pokeName, evolved, { species }) {
//     const secondStageName = evol1to2(evolved, species, "name");
//     const secondStageID = convertURLTOID(evol1to2(evolved, species, "url"));
//     let evolHTML = ``;
//     const basic = babyEvol(evolved);
//     //Check for no evolutions, return the species name
//     if (basic.length == 0) {
//       //print the image of the baby here.
//       evolHTML += `<div class=pkmn-one-evol><div class="part-1"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeName}.png" alt=""><p class="lead artwork-lead" style="font-size:1.1=em; font-weight:600;">${pokeName}</p></div></div>`;
//     } else if (secondStageID.length == 1) {
//       //pokemon has a normal evo chain, no branches.
//       secondStageID.forEach((id) => {
//         for (let key in id) {
//           evolHTML += `<div class="part-1"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[key]}.png" alt="">
//                     <p class="lead artwork-lead" style="font-size:1.1=em; font-weight:600;">${secondStageName[0][key]}</p></div>`;
//           //<div class="arr"><img src="./right-arrow.png" alt=""></div>`
//         }
//       });
//     } else if (secondStageID.length > 1) {
//       //poke 2nd or third stage has more than one branch.
//       //We must differentiate between the branches by speces.name
//       if (
//         pokeName == convertURLTOID(species.url) ||
//         (secondStageID[0]["next"] == pokeName && secondStageName[0]["final"])
//       ) {
//         let array = [];
//         [...secondStageID, ...secondStageName].forEach((acc, index) => {
//           array[index] = [];
//           for (let key in acc) {
//             if (array[index].indexOf(acc[key]) < 0) {
//               array[index].push(acc[key]);
//             }
//           }
//         });
//         //remove duplicates if any.
//         array = Array.from(
//           new Set(
//             array.reduce((acc, curr) => {
//               return acc.concat(curr);
//             }, [])
//           )
//         );
//         array = [
//           array.splice(0, array.length / 2),
//           array.splice(0, array.length),
//         ];
//         array[0].forEach((val, index) => {
//           evolHTML += `<div class="part-1"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${val}.png" alt="">
//                     <p class="lead artwork-lead" style="font-size:1.1=em; font-weight:600;">${array[1][index]}</p></div>`;
//         });
//       } else {
//         //Branched evolutions belong here.
//         //Let middle = pokemon with branched evolutions at the first stage.
//         //let final = pokemon with branched evolutions at the 2nd form.
//         let middle = groupBy(secondStageID, "next")[pokeName];
//         let final = groupBy(secondStageID, "final")[pokeName];
//         middle = middle || final;
//         let index = secondStageID.findIndex((obj) => {
//           if (obj.final == undefined) {
//             return obj.next == middle[0].next;
//           } else {
//             return obj.final == middle[0].final;
//           }
//         });
//         middle.forEach((id) => {
//           for (let key in id) {
//             evolHTML += `<div class="part-1"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[key]}.png" alt="">
//                         <p class="lead artwork-lead" style="font-size:1.1=em; font-weight:600;">${secondStageName[index][key]}</p>
//                     </div>`;
//           }
//         });
//       }
//     }
//     return evolHTML;
//   }
//   const evolutionComplete = getEvolution(id, evolve, chain);
//   this.evolve_container.insertAdjacentHTML("beforeend", evolutionComplete);
// });


var PokemonEvolution = function PokemonEvolution(_ref) {
  var evolutionLine = _ref.evolutionLine;
  var chain = evolutionLine.chain;
  var nextEvolution = chain.evolves_to,
      basePokemon = chain.species; //check if nextEvolution

  var pkmnEvolution = [].concat(fullEvolution(nextEvolution, basePokemon)).map(function (poke) {
    if (poke.name === undefined) return {
      name: poke.species.name,
      id: (0, _usefulFunctions.getID)(poke.species.url, /\/pokemon-species\/(\d+)\//)
    };
    return {
      name: poke.name,
      id: (0, _usefulFunctions.getID)(poke.url, /\/pokemon-species\/(\d+)\//)
    };
  }); // let renderEvolution = [...pkmnEvolution];
  // const selectedPokemon = Number(window.location.hash.split("#")[1]);
  // const confirmDuplicates = pkmnEvolution
  //   .map((pkmn) => pkmn.name)
  //   .every(duplicateCheck);
  // const evolLength = pkmnEvolution.length;
  // console.log(evolLength);
  // let pkmnLoc = pkmnEvolution.findIndex((poke) => poke.id === selectedPokemon);
  // console.log(renderEvolution);
  // renderEvolution = [...renderEvolution].map((pokemon) => (
  //   <>
  //     <PokemonImage className="ui tiny image" pokemon={pokemon}></PokemonImage>
  //     {/* <span>{pokemon.name}</span> */}
  //   </>
  // ));
  // return <div className="ui segment">{renderEvolution}</div>;
};

var _default = PokemonEvolution;
exports["default"] = _default;