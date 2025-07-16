export const PokemonCard = ({ pokemon, gradientClass }) => {
  return (
    <div className="row justify-content-center w-100">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div
          className={`card card-pokemon ${gradientClass} mx-auto mb-4`}
          style={{ maxWidth: '300px' }}
        >
          <div id={pokemon.id} className="card-body p-3">
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
              style={{ maxHeight: '140px' }}
            />

            <div
              className="d-flex justify-content-around mb-2"
              style={{ fontSize: '0.8rem' }}
            >
              <span className="d-flex flex-column">
                <strong>Peso:</strong> {(pokemon.weight * 0.1).toFixed(2)} kg
              </span>
              <span className="d-flex flex-column">
                <strong>Altura:</strong> {(pokemon.height * 10).toFixed(2)} cm
              </span>
            </div>

            <div className="row" style={{ fontSize: '0.8rem' }}>
              {pokemon.stats.map((stat, index) => (
                <div
                  key={index}
                  className="col-6 mb-2 d-flex justify-content-between"
                >
                  <span className="text-capitalize">{stat.stat.name}</span>
                  <span className="fw-bold text-black">{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
