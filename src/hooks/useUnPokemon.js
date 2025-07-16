import { useState } from 'react'
import { searchId } from '../services/pokemonId'

export function useUnPokemon () {
  const [pokemon, setPokemon] = useState(null)
  const [firstSearch, setFirstSearch] = useState(true)
  const [loading, setLoading] = useState(false)
  const [gradientClass, setGradientClass] = useState('')
  const [error, setError] = useState(null)

  const fetchPokemon = async ({ term }) => {
    if (term === '' || !term) return

    setLoading(true)
    setFirstSearch(false)
    setError(null)

    try {
      const data = await searchId({ term })
      setPokemon(data)

      const types = data.types.map((t) => t.type.name)

      setGradientClass(
        types.length === 2
          ? `type-${types[0]}-${types[1]}-gradient`
          : `type-${types[0]}`
      )
    } catch (error) {
      console.error('Error:', error)
      setPokemon(null)
      setGradientClass('')
      setError('No se encontró el Pokémon')
    } finally {
      setLoading(false)
    }
  }

  return { pokemon, loading, gradientClass, firstSearch, error, fetchPokemon }
}
