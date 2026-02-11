export const getRandomPokemon = async () => {
  try {
    const pokemonId = Math.floor(Math.random() * 150) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    const data = await response.json();
    const pokemonObj = {
      name: data.name,
      types: data.types.map((type) => type.type.name).join(', '),
      sprite: data.sprites.back_default,
    }
    return { data: pokemonObj, error: null};
  }
  catch (error) {
    console.log(error);
    return { data: null, error};
  }
};