import axios from "axios";

const Pokeapi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export default Pokeapi;
