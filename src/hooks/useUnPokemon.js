import { useState } from 'react'
import { searchId } from '../services/pokemonId'
import { searchSpecies } from '../services/pokemonSecie'
import { typeColors } from '../services/colores'
import { pokemonLimit } from '../services/pokemonLimit'

export function useUnPokemon () {
  const [pokemon, setPokemon] = useState(null)
  const [pokemons, setPokemons] = useState([])
  const [firstSearch, setFirstSearch] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPokemon = async ({ term }) => {
    if (!term || term.trim() === '') return

    setLoading(true)
    setFirstSearch(false)
    setError(null)
    setPokemon(null)
    setPokemons([])

    function esUnNumero (input) {
      return !isNaN(input)
    }

    async function getFullPokemonData (termOrUrl) {
      // Si es un número, busca por ID; si no, usa la URL
      let data
      if (!isNaN(termOrUrl)) {
        data = await searchId({ term: termOrUrl })
      } else {
        const res = await fetch(termOrUrl)
        data = await res.json()
      }

      const speciesData = await searchSpecies({ term: data.id })

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

      const types = data.types.map((t) => t.type.name)
      let gradientClass = ''
      if (types.length === 2) {
        const [type1, type2] = [...types].sort()
        const color1 = typeColors[type1]
        const color2 = typeColors[type2]
        gradientClass = `linear-gradient(135deg, ${color1}, ${color2})`
      } else {
        const color = typeColors[types[0]]
        gradientClass = color
      }

      const evolutionNames = getEvolutionNames(evolutionData.chain)

      return {
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
        evolutionChain: evolutionNames,
        gradientClass
      }
    }

    try {
      if (esUnNumero(term)) {
        const fullData = await getFullPokemonData(term)
        setPokemon(fullData)
      } else {
        const data = await pokemonLimit()
        const search = term.trim().toLowerCase()

        const pokemonFound = data.filter((pokemon) =>
          pokemon.name.includes(search)
        )

        if (pokemonFound.length === 0) {
          setError('No se encontró el Pokémon')
          setLoading(false)
          return
        }

        const pokemonsFullData = await Promise.all(
          pokemonFound.map(async (poke) => {
            try {
              return await getFullPokemonData(poke.url)
            } catch (err) {
              console.warn(`Error con ${poke.name}:`, err)
              return null
            }
          })
        )

        setPokemons(pokemonsFullData.filter(Boolean))
      }
    } catch (err) {
      console.error('Error:', err)
      setPokemon(null)
      setError('No se encontró el Pokémon')
    } finally {
      setLoading(false)
    }
  }

  return {
    pokemon,
    loading,
    firstSearch,
    error,
    fetchPokemon,
    pokemons
  }
}
