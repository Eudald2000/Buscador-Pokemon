import { useState } from 'react'

export const PokemonCard = ({ front, back, gradientClass }) => {
  const [flipped, setFlipped] = useState(false)

  function handleFlip () {
    setFlipped(!flipped)
  }

  return (
      <div className="col-12 col-sm-10 col-md-6 col-lg-4 mx-auto altMin">
        <div
          onClick={handleFlip}
          className="card-pokemon-container mx-auto mb-4"
        >
          <div className={`card-pokemon-inner ${flipped ? 'flipped' : ''}`}>
            <div className='card-pokemon'style={{ background: gradientClass }}>
              {front}
            </div>
            <div className='card-pokemon' style={{ background: gradientClass }}>
              {back}
            </div>
          </div>
        </div>
      </div>
  )
}
