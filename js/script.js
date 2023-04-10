const URL_API = "https://pokeapi.co/api/v2/pokemon";
const pokemonDetailsCover = document.querySelector(".section__pokemon");
const pokemonDetailsBoard = document.querySelector(".section__information");
const pokemonButtons = document.querySelector(".footer");

//Obtener detalles de los pokemons e imprimirlos

const getPokemons = async (name) => {
  try {
    const { data } = await axios.get(`${URL_API}/${name}`); //desestructuración de objetos
    // console.log(data);
    // printDetailsBoard(data)
    // printDetailsCover(data)
    // printButtonsPokemons(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};

async function getAllInfoPokemon(name) {
  //   const allInfoPokemon = [];
  try {
    const { data } = await axios.get(`${URL_API}/${name}`); //desestructuración de objetos

    const poke = {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      image: data.sprites.other.dream_world.front_default,
      abilities: data.abilities[0].ability.name,
      type: data.types[0].type.name
    };

    // pokemonDetailsCover(poke)
    // pokemonDetailsBoard(poke)
    // allInfoPokemon.push(poke);
    return poke;
  } catch (error) {
    console.log(error);
  }
};

async function getAllPokemonBotons(name) {
  //   const allInfoPokemon = [];
  try {
    const { data } = await axios.get(`${URL_API}/${name}`); //desestructuración de objetos

    const poke = {
      id: data.id,
      name: data.name,
      image: data.sprites.other.dream_world.front_default,
    };

    // pokemonDetailsCover(poke)
    // pokemonDetailsBoard(poke)
    // allInfoPokemon.push(poke);
    return poke;
  } catch (error) {
    console.log(error);
  }
};

//Pintar los botones de los pokemones

function printDetailsCover(pokemon) {
  pokemonDetailsCover.innerHTML = `
  <div class="section__pokemon-name">
    <figure class="section__pokemon-icon">
      <img
      src="${pokemon.sprites.front_default}"
      alt="Icono Fuego"/>
    </figure>
    <h2 class="section__pokemon-title">${pokemon.name}</h2>
          </div>
          <figure class="section__img">
            <img
              src="${pokemon.sprites.other.dream_world.front_default}"
              alt="${pokemon.name}"/>
   </figure>
  `;
}

// printDetailsCover(URL_API, getAllInfoPokemon);

function printDetailsBoard(pokemon) {
  pokemonDetailsBoard.innerHTML = `
  <span>NO.<p>${pokemon.id}</p></span>
  <span>LEVEL<p>100</p></span>
  <span>TYPE<p>${pokemon.type}</p></span>
  <span>HABILITY<p>${pokemon.abilities}</p></span>
  <span>HEIGHT<p>${pokemon.height}</p></span>
  <span>WEIGHT<p>${pokemon.weight}</p></span>
  `;
};


// printDetailsBoard(URL_API, getAllInfoPokemon);

function printButtonsPokemons(pokemon) {
  pokemonButtons.innerHTML += `
<button class="pokeBoton" data-url="${URL_API}">
<img src=${pokemon.image} />
${pokemon.name}
</button>
`;
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Imprimir la portada y la tabla de información de forma aleatoria
document.addEventListener("DOMContentLoaded", async () => {
  let random = getRandomInt(1, 100);

  let pokemonRandomCover = await getPokemons(random);
  let pokemonRandomBoard = await getAllInfoPokemon(random);

  printDetailsCover(pokemonRandomCover, pokemonDetailsCover)
  printDetailsBoard(pokemonRandomBoard, pokemonDetailsBoard)

});


//Ciclo para generar los botones

for (let i = 0; i < 4; i++) {
  const randomId = Math.floor(Math.random() * 200) + 1;

  let pokemonRandomButton = await getAllPokemonBotons(randomId);
  printButtonsPokemons(pokemonRandomButton, pokemonButtons);
}
//--------------------------------------------------------------------


// Imprimir la portada y la tabla de información al hacerle click a un botón

// let buttonPoke = document.getElementsByClassName("pokeBoton");
// buttonPoke = addEventListener("click", async () => {
//   console.log("hice click");
// }) //Solo me escucha el click

// document.addEventListener("DOMContentLoaded", async (e) => {
//   let urlPokemon = e.target.getAttribute("data-url");

//   // if(urlPokemon){
//   //   console.log("hola")
//   //   const poke = await getPokemons(urlPokemon);
//   //   printDetailsCover(poke, pokemonDetailsCover)
//   // }

//   // for (let i = 0; i < 0; i++){
//   //   const poke = await getPokemons(urlPokemon);
//   //   printDetailsCover(poke, pokemonDetailsCover)
//   // }
// });
