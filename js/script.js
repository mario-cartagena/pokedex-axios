const URL_API = "https://pokeapi.co/api/v2/pokemon";
const sectionPokemons = document.querySelector(".section__pokemon");
const sectionInfoPokemon = document.querySelector(".section__information");
const sectionOthersPokemons = document.querySelector(".footer");

//Funcion que me retorna un número entero aleatorio entre min(incluido) y max(excluido).
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getPokemonsFooter = async (url) => {
  let allInfoPokemons = [];
  try {
    const { data } = await axios.get(url); //desestructuración de objetos
    for (const pokemon of data.results) {
      const urlPokemon = pokemon.url;
      const response = await axios.get(urlPokemon);
      const poke = {
        id: response.data.id,
        name: response.data.name,
        height: response.data.height,
        weight: response.data.weight,
        image: response.data.sprites.other.dream_world.front_default,
        abilities: response.data.abilities.map((item) => item.ability.name),
        type: response.data.types.map((item) => item.type.name),
      };
      allInfoPokemons.push(poke);
    }
    return allInfoPokemons;
  } catch (error) {
    console.log(error);
  }
};

const getPokemons = async (id) => {
  try {
    const { data } = await axios.get(`${URL_API}/${id}`); //desestructuración de objetos
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllInfoPokemon = async (id) => {
  try {
    const { data } = await axios.get(`${URL_API}/${id}`); //desestructuración de objetos

    const poke = {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      image: data.sprites.other.dream_world.front_default,
      abilities: data.abilities.map((item) => item.ability.name),
      type: data.types.map((item) => item.type.name)
    };
    return poke;
  } catch (error) {
    console.log(error);
  }
};

const printCardPokemon = (poke, container) => {
  console.log(poke);
  container.innerHTML = `
        <div class="section__pokemon-name">
        <figure class="section__pokemon-icon">
        <img
        src="${poke.image}"
        alt="Icono Fuego"
      />
      </figure>
            <h2 class="section__pokemon-title">${poke.name}</h2>
          </div>
          <figure class="section__img">
            <img
              src="${poke.image}"
              alt=${poke.name}
            />
          </figure>
        </div>
    `;
};

const printInfoPokemon = (poke, container) => {
  container.innerHTML = `
    <span class="span__information">NO.<p>${poke.id}</p></span>
    <span class="span__information">LEVEL<p>100</p></span>
    <span class="span__information">TYPE<p>${poke.type}</p></span>
    <span class="span__information" id="hability">HABILITY<p>${poke.abilities}</p></span>
    <span class="span__information">HEIGHT<p>${poke.height}</p></span>
    <span class="span__information">WEIGHT<p>${poke.weight}</p></span>
    `;
};

const printOtherPokemons = (poke, container) => {
  poke.forEach(item => {
    container.innerHTML += `
      <figure class="footer_figure">
      <img data-card="cards" name=${item.id} src=${item.image} alt=${item.name}
      />
      </figure>
    `;
  });
}

//********* Busqueda de personajes por titulo  ************
const filterByName = (termSearch, poke) => {
  const pokemonesFiltrados = poke.filter((video) =>
  video.name.toLowerCase().includes(termSearch.toLowerCase())
  );
  //validar que no esté vacío
  const result = pokemonesFiltrados.length
    ? pokemonesFiltrados
    : poke;

  const messageResult = pokemonesFiltrados.length
    ? false
    : "No existe este pokemon!";
  return {
    resultSearch: result,
    messageSearch: messageResult,
  };
};
const formSearch = document.querySelector(".search-bar");
formSearch.addEventListener("submit", async (event) => {
  event.preventDefault();

  console.log(formSearch.children);
  const formChildren = Array.from(formSearch.children);
  console.log(formChildren);

  const inputSearch = formChildren.find((item) => item.localName === "input");
  console.log(inputSearch);

  const searchTerm = inputSearch.value;
  console.log(searchTerm)

  const prueba = await getPokemonsFooter(URL_API);
  console.log(prueba)

  if(searchTerm){
      const searchResult = filterByName(searchTerm, prueba);
      console.log(searchResult);
      // printVideos(containerVideos, searchResult.resultSearch);
      printCardPokemon(searchResult.resultSearch, sectionPokemons);
      if(searchResult.messageSearch){
          Swal.fire(
              'Oops!',
              searchResult.messageSearch,
              'error'
          )
      }
    }else{
      Swal.fire(
          'Oops!',
          'No ingresaste el nombre del pokemon!',
          'error'
      )
    }
});

document.addEventListener("DOMContentLoaded", async () => {
  const random = getRandomInt(1, 151);
  const pokemon = await getPokemons(random);
  console.log(pokemon);
  
  const allInfo = await getAllInfoPokemon(random);
  console.log(allInfo);
  
  printInfoPokemon(allInfo, sectionInfoPokemon);
  printCardPokemon(allInfo, sectionPokemons);

  const allPokemons = await getPokemonsFooter(`${URL_API}?limit=4`);
  console.log(allPokemons);
  printOtherPokemons(allPokemons, sectionOthersPokemons);
});


document.addEventListener("click", async (event) => {
    const allPokemons = await getPokemonsFooter(`${URL_API}?limit=4`);
    const dataCardAttribute = event.target.getAttribute("data-card");
    if (dataCardAttribute === "cards") {
      const id = event.target.getAttribute("name");
      printCardPokemon(allPokemons[id-1], sectionPokemons);
      printInfoPokemon(allPokemons[id-1], sectionInfoPokemon);
    }
});