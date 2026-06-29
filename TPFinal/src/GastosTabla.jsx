// Componente: Tabla que muestra todos los gastos con acciones
function GastosTabla({ gastos, editarGasto, eliminarGasto }) {

  return (
    <table className="table is-fullwidth is-striped">
      {/* Cabecera con titulos de columnas */}
      <thead>
        <tr>
          <th>Monto $</th>
          <th>Categoría</th>
          <th>Fecha</th>
          <th>Detalle</th>
          <th>Acciones</th>
        </tr>
      </thead>

      {/* Cuerpo tabla: condicion si hay o no gastos */}
      <tbody>
        {gastos.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              No hay gastos registrados
            </td>
          </tr>
        ) : (
          gastos.map((gasto) => (
            <tr key={gasto.id}>
              <td>${gasto.monto}</td>
              <td>{gasto.categoria}</td>
              <td>{gasto.fecha}</td>
              <td>{gasto.detalle}</td>
              <td>
                <button
                  className="button is-warning is-small"
                  onClick={() => editarGasto(gasto)}
                  style={{ marginRight: "5px" }}
                >
                  Editar
                </button>

                <button
                  className="button is-danger is-small"
                  onClick={() => eliminarGasto(gasto.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default GastosTabla; 