export const PokemonError = ({ error = 'No se pudo encontrar el Pokémon.' }) => {
  return (
    <div className="alert alert-danger text-center my-4" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      {error}
    </div>
  )
}
