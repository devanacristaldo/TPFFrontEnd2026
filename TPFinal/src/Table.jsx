
function Table({ detalle }) {

    return (
        <table className="table is-fullwidth is-striped">
            <thead>
                <tr>
                    <th>Monto $</th>
                    <th>Categoría</th>
                    <th>Fecha</th>
                    <th>Detalle</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>$1000</td>
                    <td>Internet</td>
                    <td>03/06/2026</td>
                    <td>Pago mensual del servicio</td>
                </tr>
            </tbody>

            <tbody>
                <td>{detalle}</td>
            </tbody>
        </table>
    )
}

export default Table;