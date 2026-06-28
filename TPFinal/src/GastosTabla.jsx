// Componente: Tabla que muestra todos los gastos con acciones
function GastosTabla({ gastos, editarGasto, eliminarGasto }) {

  // Cabecera tabla: columnas Monto, Categoría, Fecha, Detalle, Acciones
  // Si gastos == 0: muestra mensaje "No hay gastos registrados"
  // Si !== 0: renderiza cada gasto con botones Editar y Eliminar

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

      {/* Cuerpo tabla: condicin si hay o no gastos */}
      <tbody>
        {gastos.length === 0 ? (
          <tr>
            {/* Mensaje cuando no hay ningun gastos */}
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
                {/* Boton d Editar: llama editarGasto(gasto) */}
                <button
                  className="button is-warning is-small"
                  onClick={() => editarGasto(gasto)}
                  style={{ marginRight: "5px" }}
                >
                  Editar
                </button>

                {/* Boton Eliminar: llama eliminarGasto(gasto.id) */}
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

export default GastosTabla; // Exporta componente