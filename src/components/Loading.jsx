export const Loading = ({ mensaje = 'Cargando...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-5">
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="text-muted fs-5">{mensaje}</p>
    </div>
  )
}
