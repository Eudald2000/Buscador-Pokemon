export const Buscador = ({ handleSubmit, handleChange, searchTerm }) => {
  return (
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
  )
}
