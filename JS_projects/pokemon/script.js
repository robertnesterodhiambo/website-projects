async function searchPokemon() {
    const pokemonId = document.getElementById('numberInput').value;
    const errorElement = document.getElementById('error');
    const cardElement = document.getElementById('pokemonCard');
  
    if (!pokemonId || pokemonId <= 0) {
      errorElement.textContent = 'Please enter a valid Pokémon ID.';
      cardElement.style.display = 'none';
      return;
    }
  
    errorElement.textContent = '';
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      const data = await response.json();
      displayPokemon(data);
    } catch (error) {
      errorElement.textContent = 'Failed to fetch Pokémon data. Please try again.';
      cardElement.style.display = 'none';
    }
  }
  
  function displayPokemon(pokemon) {
    const cardElement = document.getElementById('pokemonCard');
    cardElement.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
      <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
      <p><strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
      <p><strong>Moves:</strong> ${pokemon.moves.slice(0, 4).map(move => move.move.name).join(', ')}</p>
    `;
    cardElement.style.display = 'block';
  }
  