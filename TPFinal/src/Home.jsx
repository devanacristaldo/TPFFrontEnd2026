import { useState, useEffect } from "react";
import { setItem, getItem } from "./utils/localStorage";

function Home() {

    const [fecha, setFecha] = useState("");
    const [detalle, setDetalle] = useState("");
    const [categoria, setCategoria] = useState("");
    const [monto, setMonto] = useState("");

    const [gastos, setGastos] = useState([]);
    const [gastoEditando, setGastoEditando] = useState(null); // Para saber si estamos actualizando

    // Cargar gastos guardados al iniciar
    useEffect(() => {
        const gastosGuardados = getItem("gastos");
        if (gastosGuardados) {
            setGastos(gastosGuardados);
        }
    }, []);

    // Agregar o actualizar gasto
    function agregarGasto() {
        if (!monto || !categoria || !fecha) {
            alert("Por favor completa fecha, categoría y monto");
            return;
        }

        const nuevoGasto = {
            id: gastoEditando ? gastoEditando.id : Date.now(), // ID único
            monto: monto,
            categoria: categoria,
            fecha: fecha,
            detalle: detalle
        };

        let nuevosGastos;

        if (gastoEditando) {
            // Actualizar gasto existente
            nuevosGastos = gastos.map(gasto => 
                gasto.id === gastoEditando.id ? nuevoGasto : gasto
            );
            setGastoEditando(null);
        } else {
            // Agregar nuevo gasto
            nuevosGastos = [...gastos, nuevoGasto];
        }

        setGastos(nuevosGastos);
        setItem("gastos", nuevosGastos); // Guardar array completo

        // Limpiar formulario
        setFecha("");
        setDetalle("");
        setCategoria("");
        setMonto("");
    }

    // Eliminar gasto
    function eliminarGasto(id) {
        const nuevosGastos = gastos.filter(gasto => gasto.id !== id);
        setGastos(nuevosGastos);
        setItem("gastos", nuevosGastos);
    }

    // Preparar edición
    function editarGasto(gasto) {
        setFecha(gasto.fecha);
        setDetalle(gasto.detalle);
        setCategoria(gasto.categoria);
        setMonto(gasto.monto);
        setGastoEditando(gasto);
    }

    // Cancelar edición
    function cancelarEdicion() {
        setFecha("");
        setDetalle("");
        setCategoria("");
        setMonto("");
        setGastoEditando(null);
    }

    return (
        <>
            <h1>TP Final Dev-01</h1>
            <div>

                <div className="columns">

                    <div className="column">

                        <div className="container mt-5">

                            <div className="mb-3">
                                <label class="label">Fecha</label>

                                <input
                                    type="date"
                                    id="fecha"
                                    className="form-control"
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="column">

                        <div class="field">
                            <label class="label">Categoria</label>
                            <div class="control">
                                <div class="select">
                                    <select value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}>
                                        <option>Select </option>
                                        <option>Transporte</option>
                                        <option>Almacén</option>
                                        <option>Gastos Personales</option>
                                        <option>Internet</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="column">

                        <div class="field">
                            <label class="label">Monto$</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="..."
                                    value={monto}
                                    onChange={(e) => setMonto(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <textarea class="textarea" placeholder="Detalle..."
                            value={detalle}
                            onChange={(e) => setDetalle(e.target.value)}
                        />
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button
                            className="button is-link"
                            onClick={agregarGasto}>
                            {gastoEditando ? "Actualizar" : "Agregar"}
                        </button>
                    </div>
                    {gastoEditando && (
                        <div class="control">
                            <button
                                className="button is-warning"
                                onClick={cancelarEdicion}>
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>

                <table className="table is-fullwidth is-striped">
                    <thead>
                        <tr>
                            <th>Monto $</th>
                            <th>Categoría</th>
                            <th>Fecha</th>
                            <th>Detalle</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

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

            </div>

        </>

    )
}

export default Home