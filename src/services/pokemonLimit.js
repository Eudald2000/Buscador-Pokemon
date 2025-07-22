// services/pokemonLimit.js
const API = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0'
let cachedAllPokemon = null

export const pokemonLimit = async () => {
  if (cachedAllPokemon) return cachedAllPokemon
  try {
    const allResults = []
    let url = API

    while (url) {
      const response = await fetch(url)
      const json = await response.json()
      allResults.push(...json.results)
      url = json.next // si hay más, continúa
    }

    cachedAllPokemon = allResults
    return cachedAllPokemon
  } catch (error) {
    throw new Error('Error al cargar todos los Pokémon: ' + error.message)
  }
}
