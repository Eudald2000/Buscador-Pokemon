export const BackCard = ({ pokemon }) => {
  return (
    <div className="card-body p-3">
      <div className="text-center mb-3">

        {pokemon.sprites.back_default && (
          <img
            src={pokemon.sprites.back_default}
            alt={`${pokemon.name} reverse`}
            className="img-fluid mb-2"
            style={{ maxHeight: '100px' }}
          />
        )}
      </div>

      <div className="mb-3">
        <h6 className="text-primary text-center">Tipo</h6>
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {pokemon.types.map((t, i) => (
            <span
              key={i}
              className="badge bg-dark text-light text-capitalize px-3 py-2"
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <h6 className="text-primary text-center">Descripcion</h6>
        <p className='text-center letraPequeña'>{pokemon.flavorText}</p>
      </div>

      <div className="text-center text-muted">
        <p>Cadena evolutiva</p>
        <ul
          className="list-group list-group-horizontal justify-content-center letraPequeña"
        >
          {pokemon.evolutionChain.map((e, i) => (
            <li key={i} className="list-group-item border-0 p-0 mx-1">
              <span className="text-capitalize">{e}</span>
              {i < pokemon.evolutionChain.length - 1 && (
                <span className="mx-1">→</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
