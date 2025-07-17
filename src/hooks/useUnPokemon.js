import { useState } from 'react'
import { searchId } from '../services/pokemonId'
import { searchSpecies } from '../services/pokemonSecie'

export function useUnPokemon () {
  const [pokemon, setPokemon] = useState(null)
  const [firstSearch, setFirstSearch] = useState(true)
  const [loading, setLoading] = useState(false)
  const [gradientClass, setGradientClass] = useState('')
  const [error, setError] = useState(null)

  const fetchPokemon = async ({ term }) => {
    if (!term || term.trim() === '') return

    setLoading(true)
    setFirstSearch(false)
    setError(null)

    try {
      // Fetch principal
      const data = await searchId({ term })

      // Fetch de especie
      const speciesData = await searchSpecies({ term })

      // Obtener flavorText en español
      function getSpanishFlavorText (entries) {
        const spanishEntry = entries.find(
          (entry) => entry.language.name === 'es'
        )
        return spanishEntry
          ? spanishEntry.flavor_text.replace(/\n|\f/g, ' ').trim()
          : 'Descripción no disponible en español'
      }

      // Obtener evolución desde URL
      const evolutionChainUrl = speciesData.evolution_chain.url
      const evolutionResponse = await fetch(evolutionChainUrl)
      const evolutionData = await evolutionResponse.json()

      // Extraer nombres de la cadena de evolución
      function getEvolutionNames (chain) {
        const names = []
        function add (node) {
          names.push(node.species.name)
          node.evolves_to.forEach(add)
        }
        add(chain)
        return names
      }

      const evolutionNames = getEvolutionNames(evolutionData.chain)

      // Establecer estado con datos completos
      setPokemon({
        id: data.id,
        name: data.forms[0].name,
        sprites: {
          front_default: data.sprites.front_default || '/img/No-Image.svg',
          back_default: data.sprites.back_default || '/img/No-Image.svg'
        },
        types: data.types,
        abilities: data.abilities,
        base_experience: data.base_experience,
        weight: data.weight,
        height: data.height,
        stats: data.stats,
        flavorText: getSpanishFlavorText(speciesData.flavor_text_entries),
        evolutionChain: evolutionNames
      })

      const types = data.types.map((t) => t.type.name)
      setGradientClass(
        types.length === 2
          ? `type-${types[0]}-${types[1]}-gradient`
          : `type-${types[0]}`
      )
    } catch (err) {
      console.error('Error:', err)
      setPokemon(null)
      setGradientClass('')
      setError('No se encontró el Pokémon')
    } finally {
      setLoading(false)
    }
  }

  return {
    pokemon,
    loading,
    gradientClass,
    firstSearch,
    error,
    fetchPokemon
  }
}
