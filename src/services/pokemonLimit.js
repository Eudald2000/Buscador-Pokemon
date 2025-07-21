const API = 'https://pokeapi.co/api/v2/pokemon?limit=10000'

export const pokemonLimit = async () => {
  try {
    const response = await fetch(`${API}`)

    const json = await response.json()

    return json
  } catch (error) {
    throw new Error('Error fetching pokemon: ' + error.message)
  }
}
