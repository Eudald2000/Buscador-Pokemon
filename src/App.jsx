import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Buscador } from './components/Buscador'
import { Loading } from './components/Loading'
import { PokemonCard } from './components/PokemonCard'
import { PokemonError } from './components/PokemonError'
import { useUnPokemon } from './hooks/useUnPokemon'
import { FrontCard } from './components/FrontCard'
import { BackCard } from './components/BackCard'

function App () {
  const [searchTerm, setSearchTerm] = useState('')
  const [flipped, setFlipped] = useState(false)
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

  function handleFlip () {
    setFlipped(!flipped)
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
                <PokemonCard
                  gradientClass={gradientClass}
                  flippCard={handleFlip}
                  flipped={flipped
                }>
                  {
                    flipped
                      ? <BackCard pokemon={pokemon}/>
                      : <FrontCard pokemon={pokemon}/>
                  }
                </PokemonCard>
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
