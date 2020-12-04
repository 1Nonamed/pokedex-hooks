import axios from "axios";
import "./App.css";

// MAPPING POKEMONS INFO

export const getStats = (stats) => {
  const pokemonStats = stats.map((stat, i) => {
    return (
      <div key={i + 1}>
        <div>
          {stat.stat.name} : {stat.base_stat}
        </div>
      </div>
    );
  });
  return pokemonStats;
};

export const getAbilities = (abilities) => {
  const pokemonStats = abilities.map((ability, i) => {
    return (
      <div key={ability.ability.name}>
        <div>{ability.ability.name}</div>
      </div>
    );
  });
  return pokemonStats;
};

export const getTypes = (types) => {
  const pokemonTypes = types.map((type, index) => {
    return (
      <div
        key={index + 1}
        className={`type-btn type-flex`}
      >
        {/* <img src="https://cdn.bulbagarden.net/upload/8/87/GO_Flying.png" alt={type.type.name}/> */}
        <div className={"type-name"}>{type.type.name}</div>
      </div>
    );
  });
  return pokemonTypes;
};

const colorArray = [
  {
    type: "grass",
    color: "#7dd181",
  },
  {
    type: "fire",
    color: "#f68e5f",
  },
  {
    type: "water",
    color: "#87cefa",
  },
  {
    type: "fire",
    color: "#f68e5f",
  },
  {
    type: "bug",
    color: "#71b340",
  },
  {
    type: "poison",
    color: "#bdb2ff",
  },
  {
    type: "normal",
    color: "#d1d1d1",
  },
  {
    type: "fighting",
    color: "#f0e6ef",
  },
  {
    type: "flying",
    color: "#bde0fe",
  },
  {
    type: "ground",
    color: "#b3895d",
  },
  {
    type: "rock",
    color: "#bfa89e",
  },
  {
    type: "ghost",
    color: "#5e548e",
  },
  {
    type: "steel",
    color: "#9ea3b0",
  },
  {
    type: "electric",
    color: "#fcbf49",
  },
  {
    type: "psychic",
    color: "#f7e693",
  },
  {
    type: "ice",
    color: "#ceeeff",
  },
  {
    type: "dragon",
    color: "#ffac81",
  },
  {
    type: "dark",
    color: "#273043",
  },
  {
    type: "fairy",
    color: "#ea9ab2",
  },
  {
    type: "unknown",
    color: "#3a3a3a",
  },
  {
    type: "shadow",
    color: "#9197ae",
  },
];

export const fn = (type) => {
  const color = colorArray.find((pokemon) => pokemon.type === type);
  if (color) {
    return color.color;
  } else {
    return "";
  }
};

// GET POKEMON IMAGES URL

export const getFullImage = (id) => {
  let pokemonImg = "";
  id < 10
    ? (pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${id}.png`)
    : id < 100
    ? (pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${id}.png`)
    : (pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`);
  return pokemonImg;
};

export const getDetailImage = (id) => {
  let pokemonImg = "";
  id < 10
    ? (pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${id}.png`)
    : id < 100
    ? (pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${id}.png`)
    : (pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`);
  return pokemonImg;
};

// APPI CALLS

// APP DATA
export const getAllPokemons = async (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url).then((data) => {
      resolve(data);
    });
  });
};

export const getPokemonsData = async (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url).then((data) => {
      resolve(data.data);
    });
  });
};

// POKEMON DETAILS
export const getEvolutionChain = async (url) => {
  const responseEvolutionChain = await axios.get(url);
    const evolutionData = responseEvolutionChain.data.chain;
    return evolutionData;
};

// GENERATIONS - REGIONS
export const getAllGenerations = async (url) => {
  return await axios.get(url);
};

export const getGenerationData = async (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url).then((data) => {
      resolve(data.data);
    });
  });
};

// GENERATION CARD

export const getPokemonGenData = async (data) => {
  return new Promise((resolve, reject) => {
    axios.get(data).then((data) => {
      resolve(data.data);
    });
  });
};
