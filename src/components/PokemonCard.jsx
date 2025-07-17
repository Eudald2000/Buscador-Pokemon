export const PokemonCard = ({ front, back, gradientClass, flippCard, flipped }) => {
  return (
    <div className="row justify-content-center w-100">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div
          onClick={flippCard}
          className="card-pokemon-container mx-auto mb-4"
        >
          <div className={`card-pokemon-inner ${flipped ? 'flipped' : ''}`}>
            <div className={`card-pokemon ${gradientClass}`}>
              {front}
            </div>
            <div className={`card-pokemon ${gradientClass}`}>
              {back}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
