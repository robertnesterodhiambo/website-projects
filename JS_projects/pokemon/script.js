async function searchPokemon() {
    const pokemonId = document.getElementById('numberInput').value;
    if (!pokemonId) {
      alert('Please enter a Pokémon ID.');
      return;
    }
  
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
  
      const data = await response.json();
      displayPokemon(data);
    } catch (error) {
      alert(error.message);
    }
  }
  
  function displayPokemon(pokemon) {
    const card = document.getElementById('pokemonCard');
    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
      <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
      <p><strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
    `;
    card.style.display = 'block';
  }
  