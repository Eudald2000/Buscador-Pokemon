export const PokemonList = ({ children }) => {
  return (
    <section className="container my-4">
      <div className="row justify-content-center g-4">
        {children}
      </div>
    </section>
  )
}
