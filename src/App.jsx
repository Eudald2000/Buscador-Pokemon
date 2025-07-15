import { useState } from 'react'
import './App.css'

const API = 'https://pokeapi.co/api/v2/pokemon/'

function App () {
  const [pokemon, setPokemon] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

    function searchPokemon (term) {
      term = searchTerm.toLowerCase()

      if (term === '') return
      setLoading(true)

      fetch(`${API}${term}`)
        .then((response) => {
          if (!response.ok) throw new Error('Pokémon no encontrado')
          return response.json()
        })
        .then((data) => {
          setPokemon(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error:', error)
          setPokemon(null)
          setLoading(false)
        })
    }

  function handleSubmit (e) {
    e.preventDefault()
    searchPokemon(searchTerm)
  }

  function handleChange (e) {
    const newSearch = e.target.value
    setSearchTerm(newSearch)
  }

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="pokemon"
            value={searchTerm}
            placeholder="Busca aqui tu pokemon"
          />
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </header>
      <main>
        {loading
          ? (
          <div>Cargando...</div>
            )
          : pokemon
            ? (
          <div className="card">
            <img
              src={pokemon.sprites.front_default}
              className="card-img-top"
              alt={pokemon.forms[0].name}
            />
            <div className="card-body">
              <h5 className="card-title">
                Este pokemon es: {pokemon.forms[0].name}
              </h5>
              <h5 className="card-title">
                Su indice en la pokedex es: {pokemon.id}
              </h5>
            </div>
          </div>
              )
            : searchTerm && !loading
              ? (
                  'No se encontró el Pokémon'
                )
              : (
                  'Busca un Pokémon'
                )}
      </main>
    </>
  )
}

export default App
