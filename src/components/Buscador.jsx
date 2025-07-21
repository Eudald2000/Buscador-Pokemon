export const Buscador = ({ handleSubmit, handleChange, searchTerm }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-wrap justify-content-center gap-3 p-3 bg-white shadow rounded"
    >
      <input
        onChange={handleChange}
        type="text"
        name="pokemon"
        value={searchTerm}
        placeholder="Busca aquí tu Pokémon"
        className="form-control flex-grow-1"
        style={{ minWidth: '250px', maxWidth: '400px' }}
      />
      <button type="submit" className="btn btn-primary px-4">
        Enviar
      </button>
    </form>
  )
}
