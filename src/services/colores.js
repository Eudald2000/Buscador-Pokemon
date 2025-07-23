export const typeColors = {
  normal: '#bcbcb2',
  fighting: '#C22E28',
  flying: '#A98FF3',
  poison: '#A33EA1',
  ground: '#E2BF65',
  rock: '#B6A136',
  bug: '#A6B91A',
  ghost: '#735797',
  steel: '#B7B7CE',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  psychic: '#F95587',
  ice: '#96D9D6',
  dragon: '#6F35FC',
  dark: '#705746',
  fairy: '#D685AD',
  stellar: '#44607D',
  unknown: '#68A090'
}

const types = Object.keys(typeColors)
const combinations = []

for (let i = 0; i < types.length; i++) {
  for (let j = i + 1; j < types.length; j++) {
    const [type1, type2] = [types[i], types[j]].sort()
    combinations.push({ type1, type2 })
  }
}
combinations.forEach(({ type1, type2 }) => {
  const color1 = typeColors[type1]
  const color2 = typeColors[type2]
  const className = `.type-${type1}-${type2}-gradient`
  const css = `${className} {\n  background: linear-gradient(135deg, ${color1}, ${color2});\n}`
})
