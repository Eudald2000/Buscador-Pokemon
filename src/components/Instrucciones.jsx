export const Instrucciones = () => {
  return (
    <div className="container mt-5">
      <div className="card border-primary shadow-lg">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-info-circle-fill me-2"></i>Bienvenido a mi Pokédex
          </h4>
        </div>
        <div className="card-body bg-light">
          <p className="card-text">
            🔍 El buscador permite buscar Pokémon por <strong>ID</strong> o por <strong>Nombre</strong>.
            Si introduces un número, se buscará el Pokémon que corresponda a ese ID.
            Si introduces un texto, se mostrará todo lo que coincida, incluso nombres parciales.
          </p>
          <hr />
          <p className="card-text">
            ⚙️ Los datos se obtienen desde <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="link-primary">PokéAPI</a>,
            consultando distintos endpoints para mostrar toda la información relevante, incluyendo especies, evoluciones y más.
          </p>
          <hr />
          <p className="card-text">
            ⚠️ Algunas formas especiales como <em>Mega Evoluciones</em> o <em>Gigantamax</em> pueden no tener datos completos.
            Se mostrará la información disponible, evitando errores.
          </p>
          <div className="text-end">
          </div>
        </div>
      </div>
    </div>
  )
}
