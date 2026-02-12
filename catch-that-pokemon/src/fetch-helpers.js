export const getRandomPokemon = async () => {
  try {
    const pokemonId = Math.floor(Math.random() * 150) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    const data = await response.json();
    
    const types = data.types.map((pokeType) => pokeType.type.name).join(', ');
    const pokemonObj = {
      name: data.name,
      types: types,
      sprite: data.sprites.front_default,
    }
    return { data: pokemonObj, error: null};
  }
  catch (error) {
    console.log(error)
    return { data: null, error};
  }
};

export const postDiscoveredPokemon = async (formData) => {
  try {
    const config = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    };

    const response = await fetch('https://formspree.io/f/maqdqzlk', config);
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);

    const responseData = await response.json();
    return { data: responseData, error: null };
  }
  catch (error) {
    return { data: null, error};
  }
};
