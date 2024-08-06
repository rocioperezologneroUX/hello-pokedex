let originalPokemons = []
let pokemons = [];

function renderPokemonToUI(pokemon) {
    const pokemonId = document.createElement ("p");
    pokemonId.textContent = pokemon.id;
    pokemonId.classList.add("pokemon__id", "caption")
    const pokemonImg = document.createElement ("img");
    pokemonImg.width = 72
    pokemonImg.src = pokemon.sprites.other["official-artwork"].front_default;
    pokemonImg.alt = `Pokemon Bulbasaur sonriendo ${pokemon.name}`;

    const pokemonName = document.createElement ("p");
    pokemonName.textContent = pokemon.name;
    pokemonName.classList.add("body", "pokemon__name");

    const pokemonCard = document.createElement("article");
    pokemonCard.classList.add('pokemon__card');

    pokemonCard.appendChild(pokemonId);
    pokemonCard.appendChild(pokemonImg);
    pokemonCard.appendChild(pokemonName);

    const pokemonItem = document.createElement ("li");
    pokemonItem.classList.add('pokemon__item');

    pokemonItem.appendChild (pokemonCard);

    const pokemonList = document.querySelector ("ul.pokemon__list");
    pokemonList.appendChild (pokemonItem);
}
function clearPokemonList(){
    const pokemonList = document.querySelector ("ul.pokemon__list");
    pokemonList.innerHTML ="";
}

async function getPokemon(Name) {
    const serverResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${Name}`
    );
    console.log('Server Response', serverResponse)
    const pokemon = await serverResponse.json();
    console.log('Pokemon',pokemon)
    return pokemon;
}

async function retrievePokemons (){
    for (let i = 1; i <= 16; i++) {
        pokemons [i-1] = await getPokemon(i);
        originalPokemons [i-1] = pokemons[i-1];
    }
}

async function renderPokemons() {
    await retrievePokemons();
        for (let i = 1; i <= 16; i++) {
        renderPokemonToUI(pokemons[i-1]);
    }
}


const searchInput = document.getElementById('filters__input')
searchInput.addEventListener('keyup', function() {
    const pokemonsFiltered = originalPokemons.filter((pokemon) => pokemon.name.includes(searchInput.value));
    clearPokemonList();
   pokemonsFiltered.forEach (pokemon => {
    renderPokemonToUI (pokemon);
   })
});

renderPokemons();