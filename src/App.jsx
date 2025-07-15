import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import pokemonPrueba from "./mooks/one-result.json";

const API = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPokemon, setNewPokemon] = useState(pokemonPrueba);
  console.log(newPokemon.stats[0].base_stat);
  function searchPokemon(term) {
    term = searchTerm.toLowerCase();

    if (term === "") return;
    setLoading(true);

    fetch(`${API}${term}`)
      .then((response) => {
        if (!response.ok) throw new Error("Pokémon no encontrado");
        return response.json();
      })
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setPokemon(null);
        setLoading(false);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    searchPokemon(searchTerm);
  }

  function handleChange(e) {
    const newSearch = e.target.value;
    setSearchTerm(newSearch);
  }

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <header className="w-100 py-4">
        <form
          onSubmit={handleSubmit}
          className="d-flex justify-content-center gap-2"
        >
          <input
            onChange={handleChange}
            type="text"
            name="pokemon"
            value={searchTerm}
            placeholder="Busca aqui tu pokemon"
            className="form-control w-auto"
          />
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </header>
      <main className="container d-flex flex-column align-items-center justify-content-center flex-grow-1">
        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : pokemon ? (
          <div className="row justify-content-center w-100">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
              <div
                className="card card-pokemon mx-auto mb-4"
                style={{ maxWidth: "300px" }}
              >
                <div className="card-body p-3 border border-dark rounded bg-white">
                  <div className="text-center mb-2">
                    <h4 className="fw-bold text-uppercase fs-5 mb-1">
                      {pokemon.forms[0].name}
                    </h4>
                    <small className="text-muted"># {pokemon.id}</small>
                  </div>

                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.forms[0].name}
                    className="img-fluid mb-3 mx-auto"
                    style={{ maxHeight: "140px" }}
                  />

                  <div className="d-flex justify-content-around mb-2">
                    <span className="d-flex flex-column">
                      <strong>Peso:</strong> {(pokemon.weight * 0.1).toFixed(2)} kg
                    </span>
                    <span className="d-flex flex-column">
                      <strong>Altura:</strong> {(pokemon.height * 10).toFixed(2)} cm
                    </span>
                  </div>

                  <div className="pokemon-stats-card border rounded p-2">
                    <h6 className="text-center text-secondary mb-2">
                      Estadísticas
                    </h6>
                    {pokemon.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between mb-1"
                      >
                        <span className="text-capitalize">
                          {stat.stat.name}
                        </span>
                        <span className="fw-bold text-primary">
                          {stat.base_stat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="text-center">Busca un Pokémon</div>
        ) : (
          <div className="text-center">No se encontró el Pokémon</div>
        )}
      </main>
    </div>
  );
}

export default App;
