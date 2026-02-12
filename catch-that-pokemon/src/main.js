import { getRandomPokemon, postDiscoveredPokemon } from "./fetch-helpers";
import { renderPokemon, renderError, renderSuccess} from "./dom-helpers";

const discoverPokeBtn = document.querySelector('#discover-button');
const pokemonForm = document.querySelector('#pokemon-form');

const getAndRenderPokemon = async () => {
  const pokemon = await getRandomPokemon();
  const { data, error } = pokemon;
  if (data === null) {
    renderError(error.message);
  } else {
    renderPokemon(data);
    renderSuccess(`${data.name} was discovered!`);
  }
};

discoverPokeBtn.addEventListener('click', () => {
  getAndRenderPokemon();
});

pokemonForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(pokemonForm);
  const formValues = Object.fromEntries(formData);
  const { name, types, isFavorite } = formValues;
  formValues.isFavorite = Boolean(isFavorite);

  const pokemon = await postDiscoveredPokemon(formValues);

  if (pokemon.data === null) {
    renderError('Error: unable to capture Pokémon. Please try again later.');
  } else {
    renderSuccess(`${name} (${types}) has been captured!`);
    pokemonForm.reset()
  }
});

getAndRenderPokemon();
