import axios from "axios";

export const getAllGenerations = async (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url).then((data) => {
      resolve(data);
    });
  });
};
