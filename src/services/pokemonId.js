const API = 'https://pokeapi.co/api/v2/pokemon/'

export const searchId = async ({ term }) => {
  try {
    const response = await fetch(`${API}${term}`)

    const json = await response.json()

    return json
  } catch (error) {
    throw new Error('Error fetching pokemon: ' + error.message)
  }
}
