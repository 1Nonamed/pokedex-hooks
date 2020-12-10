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
      <div key={index + 1} className={`type-btn type-flex`}>
        {/* <img src="https://cdn.bulbagarden.net/upload/8/87/GO_Flying.png" alt={type.type.name}/> */}
        <div className={"type-name"}>{type.type.name}</div>
      </div>
    );
  });
  return pokemonTypes;
};

export const getPokemonIdNumber = (number, length) => {
  let str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
};

const colorArray = [
  {
    type: "none",
    color: "#f5f2ef",
  },
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
    return color.none;
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

export const getFirstEvo = async (name) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemonId = res.data.id;
  const result = getDetailImage(pokemonId);
  return result;
};

export const typeImages = {
  grass: "https://cdn.bulbagarden.net/upload/a/a8/Grass_icon_SwSh.png",
  fire: "https://cdn.bulbagarden.net/upload/a/ab/Fire_icon_SwSh.png",
  water: "https://cdn.bulbagarden.net/upload/8/80/Water_icon_SwSh.png",
  bug: "https://cdn.bulbagarden.net/upload/9/9c/Bug_icon_SwSh.png",
  poison: "https://cdn.bulbagarden.net/upload/8/8d/Poison_icon_SwSh.png",
  normal: "https://cdn.bulbagarden.net/upload/9/95/Normal_icon_SwSh.png",
  fighting: "https://cdn.bulbagarden.net/upload/3/3b/Fighting_icon_SwSh.png",
  flying: "https://cdn.bulbagarden.net/upload/b/b5/Flying_icon_SwSh.png",
  ground: "https://cdn.bulbagarden.net/upload/2/27/Ground_icon_SwSh.png",
  rock: "https://cdn.bulbagarden.net/upload/1/11/Rock_icon_SwSh.png",
  ghost: "https://cdn.bulbagarden.net/upload/0/01/Ghost_icon_SwSh.png",
  steel: "https://cdn.bulbagarden.net/upload/0/09/Steel_icon_SwSh.png",
  electric: "https://cdn.bulbagarden.net/upload/7/7b/Electric_icon_SwSh.png",
  psychic: "https://cdn.bulbagarden.net/upload/7/73/Psychic_icon_SwSh.png",
  ice: "https://cdn.bulbagarden.net/upload/1/15/Ice_icon_SwSh.png",
  dragon: "https://cdn.bulbagarden.net/upload/7/70/Dragon_icon_SwSh.png",
  dark: "https://cdn.bulbagarden.net/upload/d/d5/Dark_icon_SwSh.png",
  fairy: "https://cdn.bulbagarden.net/upload/c/c6/Fairy_icon_SwSh.png",
};

// APPI CALLS
// APP DATA
export const getAllPokemons = async (url) => {
  return await axios.get(url);
};

export const getPokemonsData = async (url) => {
  const res = await axios.get(url);
  const data = res.data;
  return data;
};

// POKEMON DETAILS
export const getEvolutionChain = async (url) => {
  const res = await axios.get(url);
  const data = res.data.chain;
  return data;
};

// GENERATIONS - REGIONS
export const getAllGenerations = async (url) => {
  return await axios.get(url);
};

export const getGenerationData = async (url) => {
  const res = await axios.get(url);
  const data = res.data;
  return data;
};

// GENERATION CARD
export const getPokemonGenData = async (url) => {
  const res = await axios.get(url);
  const data = res.data;
  return data;
};
