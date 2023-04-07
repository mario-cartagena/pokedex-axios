const URL_API = "https://pokeapi.co/api/v2/pokemon";
const sectionPokemons = document.querySelector(".section__pokemon");
const sectionInfoPokemon = document.querySelector(".section__information");
const sectionOthersPokemons = document.querySelector(".footer");

//Funcion que me retorna un número entero aleatorio entre min(incluido) y max(excluido).
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
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
//   const allInfoPokemon = [];
  try {
    const { data } = await axios.get(`${URL_API}/${id}`); //desestructuración de objetos

    const poke = {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      image: data.sprites.other.dream_world.front_default,
      abilities: data.abilities[0].ability.name,
      type: data.types[0].type.name
    };
    // allInfoPokemon.push(poke);
    return poke;
  } catch (error) {
    console.log(error);
  }
};

const printCardPokemon = (poke, container) => {
  console.log(poke);
  container.innerHTML = `
        <div class="section__pokemon-name">
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
    <span>NO.<p>${poke.id}</p></span>
    <span>LEVEL<p>100</p></span>
    <span>TYPE<p>${poke.type}</p></span>
    <span>HABILITY<p>${poke.abilities}</p></span>
    <span>HEIGHT<p>${poke.height}</p></span>
    <span>WEIGHT<p>${poke.weight}</p></span>
    `;
};

// const printOtherPokemons = (poke, container) => {
//     container.innerHTML =`
//     <figure class="footer_figure">
//     <img
//       src="${poke.sprites.other.dream_world.front_default}"
//       alt="${poke.name}"
//     />
//     </figure>

//     `;
// };

document.addEventListener("DOMContentLoaded", async () => {
  const random = getRandomInt(1, 151);
  const pokemon = await getPokemons(random);
  console.log(pokemon);
  
  const allInfo = await getAllInfoPokemon(random);
  console.log(allInfo);
  
  printInfoPokemon(allInfo, sectionInfoPokemon);
  printCardPokemon(allInfo, sectionPokemons);
  // printOtherPokemons(pokemon, sectionOthersPokemons);
});