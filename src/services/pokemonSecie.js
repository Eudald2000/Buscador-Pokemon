const API = 'https://pokeapi.co/api/v2/pokemon-species/'

export const searchSpecies = async ({ term }) => {
  try {
    const response = await fetch(`${API}${term}`)
    if (!response.ok) throw new Error('Not Found')
    const json = await response.json()

    return json
  } catch (error) {
    throw new Error('Error fetching pokemon: ' + error.message)
  }
}
