import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Buscador } from './components/Buscador'
import { Loading } from './components/Loading'
import { PokemonCard } from './components/PokemonCard'
import { PokemonError } from './components/PokemonError'
import { useUnPokemon } from './hooks/useUnPokemon'

function App () {
  const [searchTerm, setSearchTerm] = useState('')
  const { pokemon, loading, gradientClass, error, firstSearch, fetchPokemon } = useUnPokemon()

  function handleSubmit (e) {
    e.preventDefault()
    const term = searchTerm.toLowerCase()
    fetchPokemon({ term })
  }

  function handleChange (e) {
    const newSearch = e.target.value
    setSearchTerm(newSearch)
  }

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <header className="w-100 py-4">
        <Buscador
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          searchTerm={searchTerm}
        />
      </header>
      <main className="container d-flex flex-column align-items-center justify-content-center flex-grow-1">
        {loading
          ? (
          <Loading />
            )
          : pokemon
            ? (
                <PokemonCard pokemon={pokemon} gradientClass={gradientClass} />
              )
            : (
                !loading && !pokemon && !firstSearch && <PokemonError error="No se encontró el Pokémon" />
              )
        }
      </main>
    </div>
  )
}

export default App
