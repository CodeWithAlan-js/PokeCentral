import axios from "axios";

export const allTypesApi = async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/type");
  const data = response.data.results;
  const typeData = await Promise.all(
    data.map(async (type) => {
      const response = await axios.get(type.url);
      return response.data;
    })
  );

  return typeData;
};
