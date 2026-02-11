const discoveredList = document.querySelector('#discovered-list');
const errorMessage = document.querySelector('#error');
const successMessage = document.querySelector('#success');

export const renderPokemon = (pokemonObj) => {
  // Create
  const pokemonLi = document.createElement('li');
  const pokemonImage = document.createElement('img');
  const pokemonName = document.createElement('p');
  const pokemonTypes = document.createElement('p');
  // Modify
  pokemonImage.src = pokemonObj.sprite;
  pokemonImage.alt = `${pokemonObj.name} image`;
  pokemonName.textContent = pokemonObj.name;
  pokemonTypes.textContent = pokemonObj.types;

  // Append
  pokemonLi.append(pokemonImage, pokemonName, pokemonTypes);
  discoveredList.append(pokemonLi);
};

export const renderError = (msg) => {
  errorMessage.textContent = msg;
};

export const renderSuccess = (msg) => {
  successMessage.textContent = msg;
};
