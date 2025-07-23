export const Buscador = ({ handleSubmit, handleChange, searchTerm }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-sm mx-auto"
      style={{ maxWidth: '600px' }}
    >
      <div className="input-group input-group-lg">
        <input
          onChange={handleChange}
          type="text"
          name="pokemon"
          value={searchTerm}
          placeholder="Escribe aquí el ID o el nombre del Pokémon"
          className="form-control border-primary"
        />
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </div>
    </form>
  )
}
