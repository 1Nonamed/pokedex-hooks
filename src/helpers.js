import axios from "axios";

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

// POKEMON DETAILS

export const getEvolutionChain = async (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url).then((data) => {
      resolve(data);
    });
  });
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

// GENERATION CARDS - GET IMAGES

export const getPokemonGenData = async (data) => {
  return new Promise((resolve, reject) => {
    axios.get(data).then((data) => {
      resolve(data.data);
    });
  });
};