// Hämta HTML-element för sökformulär, sökinmatning, Pokémon-information och knapp för slumpmässig Pokémon.
const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const pokemonInfo = document.getElementById('pokemonInfo');
const randomButton = document.getElementById('randomButton');

// Sök efter Pokémon när formuläret skickas in.
form.addEventListener('submit', async function(event) {
  event.preventDefault(); // Förhindra att sidan laddas om.
  const pokemonName = input.value.trim().toLowerCase(); // Hämta inmatat Pokémon-namn.
  if (pokemonName === '') return; // Avbryt om inmatningen är tom.

  try {
    // Hämta Pokémon-data från JSON-fil.
    const response = await fetch('https://santosnr6.github.io/Data/pokemons.json');
    const data = await response.json();
    const foundPokemon = data.find(pokemon => pokemon.name.toLowerCase() === pokemonName);
    
    // Visa Pokémon-information om den finns.
    if (foundPokemon) {
      const pokemonResponse = await fetch(foundPokemon.url);
      const pokemonData = await pokemonResponse.json();
      displayPokemon(pokemonData);
    } else {
      // Visa meddelande om Pokémon inte hittades.
      pokemonInfo.innerHTML = '<p>No Pokémon found with that name.</p>';
    }
  } catch (error) {
    // Visa felmeddelande om det uppstår ett fel.
    console.error('Error fetching Pokémon data:', error);
    pokemonInfo.innerHTML = '<p>Something went wrong while fetching Pokémon data.</p>';
  }
});

// Visa en slumpmässig Pokémon när knappen klickas.
randomButton.addEventListener('click', async function() {
  try {
    // Hämta Pokémon-data från JSON-fil.
    const response = await fetch('https://santosnr6.github.io/Data/pokemons.json');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomPokemon = data[randomIndex];
    const pokemonResponse = await fetch(randomPokemon.url);
    const pokemonData = await pokemonResponse.json();
    displayPokemon(pokemonData);
  } catch (error) {
    // Visa felmeddelande om det uppstår ett fel.
    console.error('Error fetching Pokémon data:', error);
    pokemonInfo.innerHTML = '<p>Something went wrong while fetching Pokémon data.</p>';
  }
});

// Visa Pokémon-information på sidan.
function displayPokemon(pokemonData) {
  // Skapa HTML-kod för att visa Pokémon-information.
  const pokemonHTML = `
  <div class="pokemon-card">
  <h2>${pokemonData.name}</h2>
  <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
  <p>Type: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
  
  <p>Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
  <p>Base Stats:</p>
  <ul>
    ${pokemonData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
  </ul>
</div>

  `;
  // Visa Pokémon-informationen på sidan.
  pokemonInfo.innerHTML = pokemonHTML;
}
