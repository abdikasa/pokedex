import React from "react";
import PokemonImage from "./components/PokemonImage";

const capitalize = (name) => name.slice(0, 1).toUpperCase() + name.slice(1);
const getID = (url, regex) => {
  return Number(url.match(regex)[1]);
};

const imageId = (id) => pad(id);

const pad = (number) => {
  let str = "" + number;
  while (str.length < 3) {
    str = "0" + str;
  }
  return str;
};

const checkForms = () => {
  return [
    {
      3: {
        mega: "",
      },
      6: {
        mega_X: "",
        mega_Y: "",
        giga: "",
      },
      9: {
        mega: "",
      },
      12: {
        giga: "",
      },
      15: {
        mega: "",
      },
      18: {
        mega: "",
      },
      19: {
        alola: "",
      },
      20: {
        alola: "",
      },
      25: {
        alola_Cap: "",
        belle: "",
        giga: "",
        kalos_Cap: "",
        hoenn_Cap: "",
        libre: "",
        original_Cap: "",
        partner_Cap: "",
        phd: "",
        pop_Star: "",
        rock_Star: "",
        sinnoh_Cap: "",
        unova_Cap: "",
      },
      26: {
        alola: "",
      },

      27: {
        alola: "",
      },
      28: {
        alola: "",
      },
      37: {
        alola: "",
      },
      38: {
        alola: "",
      },
      50: {
        alola: "",
      },
      51: {
        alola: "",
      },
      52: {
        alola: "",
        giga: "",
        galar: "",
      },
      53: {
        alola: "",
      },
      65: {
        mega: "",
      },
      68: {
        giga: "",
      },
      74: {
        alola: "",
      },
      75: {
        alola: "",
      },
      76: {
        alola: "",
      },
      77: {
        galar: "",
      },
      78: {
        galar: "",
      },
      80: {
        mega: "",
      },
      83: {
        galar: "",
      },
      88: {
        alola: "",
      },
      89: {
        alola: "",
      },
      94: {
        giga: "",
        mega: "",
      },
      99: {
        giga: "",
      },
      103: {
        alola: "",
      },
      105: {
        alola: "",
      },
      110: {
        galar: "",
      },
      115: {
        mega: "",
      },
      122: {
        galar: "",
      },
      127: {
        mega: "",
      },
      130: {
        mega: "",
      },
      131: {
        giga: "",
      },
      133: {
        giga: "",
      },
      142: {
        mega: "",
      },
      143: {
        giga: "",
      },
      150: {
        mega_X: "",
        mega_Y: "",
      },
      181: {
        mega: "",
      },
      208: {
        mega: "",
      },
      212: {
        mega: "",
      },
      214: {
        mega: "",
      },
      222: {
        galar: "",
      },
      229: {
        mega: "",
      },
      248: {
        mega: "",
      },
      254: {
        mega: "",
      },
      257: {
        mega: "",
      },
      260: {
        mega: "",
      },
      263: {
        galar: "",
      },
      264: {
        galar: "",
      },
      282: {
        mega: "",
      },
      302: {
        mega: "",
      },
      303: {
        mega: "",
      },
      306: {
        mega: "",
      },
      308: {
        mega: "",
      },
      310: {
        mega: "",
      },
      319: {
        mega: "",
      },
      323: {
        mega: "",
      },
      334: {
        mega: "",
      },
      351: {
        rainy: "",
        snowy: "",
        sunny: "",
      },
      354: {
        mega: "",
      },
      359: {
        mega: "",
      },
      362: {
        mega: "",
      },
      373: {
        mega: "",
      },
      376: {
        mega: "",
      },
      380: {
        mega: "",
      },
      381: {
        mega: "",
      },
      382: {
        primal: "",
      },
      383: {
        primal: "",
      },
      384: {
        mega: "",
      },
      386: {
        attack: "",
        defense: "",
        speed: "",
      },
      412: {
        sandy: "",
        trash: "",
      },
      413: {
        sandy: "",
        trash: "",
      },
      421: {
        sunshine: "",
      },
      422: {
        east: "",
        west: "",
      },
      423: {
        east: "",
        west: "",
      },
      428: {
        mega: "",
      },
      445: {
        mega: "",
      },
      448: {
        mega: "",
      },
      460: {
        mega: "",
      },
      475: {
        mega: "",
      },
      479: {
        fan: "",
        frost: "",
        heat: "",
        mow: "",
        wash: "",
      },
      487: {
        origin: "",
        altered: "",
      },
      492: {
        sky: "",
      },
      531: {
        mega: "",
      },
      550: {
        blue_Striped: "",
        red_Striped: "",
      },
      555: {
        galar_Zen: "",
        galar: "",
        zen: "",
      },
      562: {
        galar: "",
      },
      569: {
        giga: "",
      },
      585: {
        autumn: "",
        summer: "",
        winter: "",
      },
      586: {
        autumn: "",
        summer: "",
        winter: "",
      },
      618: {
        galar: "",
      },
      641: {
        therian: "",
      },
      642: {
        therian: "",
      },
      645: {
        therian: "",
      },
      646: {
        black: "",
        white: "",
      },
      647: {
        resolute: "",
      },
      648: {
        pirouette: "",
      },
      658: {
        ash: "",
      },
      666: {
        archipelago: "",
        continental: "",
        elegant: "",
        fancy: "",
        garden: "",
        high_Plains: "",
        icy_Snow: "",
        jungle: "",
        marine: "",
        meadow: "",
        modern: "",
        monsoon: "",
        ocean: "",
        poke_Ball: "",
        polar: "",
        river: "",
        sandstorm: "",
        savanna: "",
        sun: "",
        tundra: "",
      },
      670: {
        eternal: "",
      },
      676: {
        diamond: "",
        heart: "",
        star: "",
      },
      678: {
        male_Female: "",
      },
      681: {
        blade: "",
      },
      718: {
        "10_Percent": "",
        complete: "",
      },
      719: {
        mega: "",
      },
      720: {
        unbound: "",
      },
      741: {
        pau: "",
        pom_Pom: "",
        sensu: "",
      },
      745: {
        dusk: "",
        midnight: "",
      },
      746: {
        school: "",
      },
      774: {
        red: "",
      },

      791: {
        radiant_Sun_Phase: "",
      },
      792: {
        full_Moon_Phase: "",
      },
      800: {
        dawn_Wings: "",
        dusk_Mane: "",
        ultra: "",
      },
      801: {
        original: "",
      },
    },
  ];
};

const crossGenEvolve = [
  112,
  464,
  113,
  242,
  117,
  230,
  125,
  466,
  126,
  467,
  233,
  474,
  176,
  468,
  183,
  184,
  221,
  473,
  315,
  407,
  356,
  477,
  25,
  26,
  126,
  35,
  36,
  39,
  40,
  42,
  169,
  82,
  462,
];

//<i class="long arrow alternate right icon"></i>
const displayPokemon = (arr, length, split = 1) => {
  if (length === 3 || length === 2) {
    return arr.map((pokemon, i) => {
      console.log(arr, pokemon, i, length);
      return (
        <React.Fragment key={pokemon.id}>
          <PokemonImage
            className="ui tiny image mr"
            pokemon={pokemon}
          ></PokemonImage>
          {i === length - 1 ? null : (
            <i className="long arrow alternate right icon"></i>
          )}
        </React.Fragment>
      );
    });
  } else if (length === 5) {
    length = 2;
    return arr.map((pokemon, i) => {
      return (
        <div style={{ margin: "1rem 0" }}>
          {pokemon.map((poke, i) => {
            return (
              <>
                <PokemonImage
                  className="ui tiny image mr"
                  pokemon={poke}
                ></PokemonImage>
                {i === length ? null : (
                  <i className="long arrow alternate right icon"></i>
                )}
              </>
            );
          })}
        </div>
      );
    });
  } else if (length === 7) {
    let twoBranch = arr.slice(split).map((poke, i) => {
      return [...arr.slice(0, split), poke];
    });
    length = split === 1 ? 1 : 2;
    return twoBranch.map((pokemon, i) => {
      return (
        <div style={{ margin: "1rem 0" }}>
          {pokemon.map((poke, i) => {
            return (
              <>
                <PokemonImage
                  className="ui tiny image mr"
                  pokemon={poke}
                ></PokemonImage>
                {i === length ? null : (
                  <i className="long arrow alternate right icon"></i>
                )}
              </>
            );
          })}
        </div>
      );
    });
  } else {
    return arr.map((pokemon, i) => {
      return (
        <>
          <PokemonImage
            className="ui tiny image mr"
            pokemon={pokemon}
          ></PokemonImage>
        </>
      );
    });
  }
};

const duplicateCheck = (search, index, arr) => arr.indexOf(search) === index;

const removeDuplicates = (arr) =>
  arr.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

function mergeDupes(arr) {
  return [...new Set([].concat(...arr))];
}

function isObjEmpty(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const checkPokemonArray = (pokemons) => {
  if (
    pokemons === undefined ||
    pokemons === null ||
    !Array.isArray(pokemons) ||
    pokemons.length === 0
  ) {
    return false;
  }
  return true;
};

export {
  removeDuplicates,
  duplicateCheck,
  getID,
  pad,
  capitalize,
  imageId,
  mergeDupes,
  isObjEmpty,
  displayPokemon,
  crossGenEvolve,
  checkPokemonArray,
  debounce,
  chunkArrayInGroups,
  checkForms,
};
