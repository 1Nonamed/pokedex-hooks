import axios from "axios";

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