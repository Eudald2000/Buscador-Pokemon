export const PokemonCard = ({ children, gradientClass, flippCard }) => {
  return (
    <div className="row justify-content-center w-100">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div
        onClick={flippCard}
          className={`card card-pokemon ${gradientClass} mx-auto mb-4`}
          style={{ maxWidth: '300px' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
