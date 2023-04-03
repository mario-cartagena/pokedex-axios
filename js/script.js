let pokemons = [];
const URL_API = "https://pokeapi.co/api/v2/pokemon";
const boxButtons = document.querySelector(".cards");
const containerPokemon = document.getElementById("section__img");
//Nos obtiene los pokemones de la API
const getPokemonsFromApi = async (url) => {
  try {
    const { data } = await axios.get(url); //desestructuración de objetos
    return data.results;
  } catch (error) {
    console.log(error);
    alert("Usuario, ocurrio un error");
    return [];
  }
};

//Nos obtiene un pokemon de la API
const getPokemonFromApi = async (url) => {
  try {
    const { data } = await axios.get(url); //desestructuración de objetos
    return data;
  } catch (error) {
    console.log(error);
    alert("Usuario, ocurrio un error");
    return {};
  }
};

//Función que nos pinta los botones con los nombres de los pokemons

const printPokemonsButtons = (pokemonList, container) => {
  container.innerHTML = "";
  pokemonList.forEach((poke) => {
    container.innerHTML += `
    <div class="contenedor_botones">
        <button class="btn-success" data-url=${poke.url}>${poke.name}</button>
    </div>    
        `;
  });
};

const printDetailsPokemons = (pokemon, container) => {
  container.innerHTML = `
  <div class="section__pokemon-name">
            <figure class="section__pokemon-icon">
              <img
              src="./img/fuego.png"
              alt="Icono Fuego"
            />
            </figure>
               <h2 class="section__pokemon-title">${pokemon.name}</h2>
          </div>
          <figure id="section__img">
        <!-- Tarjeta Squirtle -->
        <figure class="footer_figure">
          <img class="portadaPokemon"
            src=${pokemon.sprites.front_default}
            alt=${pokemon.name}
          />
        </figure>
    `;
};

document.addEventListener("DOMContentLoaded", async () => {
  //Ejecutamos la funcion que nos obtiene los pokemones
  pokemons = await getPokemonsFromApi(URL_API);
  printPokemonsButtons(pokemons, boxButtons);
});

document.addEventListener("click", async (e) => {
  const urlPokemon = e.target.getAttribute("data-url");
  if (urlPokemon) {
    const pokemon = await getPokemonFromApi(urlPokemon);
    printDetailsPokemons(pokemon, containerPokemon);
    //console.log(pokemon);
  }
});