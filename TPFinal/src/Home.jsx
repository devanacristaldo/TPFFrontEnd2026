import { useState, useEffect } from "react";
import { setItem, getItem } from "./utils/localStorage";


function Home() {

    /*Datos x tomar */
    const [fecha, setFecha] = useState("");
    const [detalle, setDetalle] = useState("");
    const [categoria, setCategoria] = useState("");
    const [monto, setMonto] = useState("");

    //Array donde se guardan todos los gastos
    const [gastos, setGastos] = useState([]);

    //pivote donde guardar gastos antes de actualizad/remplazar
    const [gastoEditando, setGastoEditando] = useState(null); 


    // Cargar gastos guardados al iniciar
    useEffect(() => {
        const gastosGuardados = getItem("gastos");
        if (gastosGuardados) {
            setGastos(gastosGuardados);
        }
    }, []);


    // Agregar o actualizar gasto
    function agregarGasto() {
        // actualizar: Validar q el monto sea numero mayor a 0
        if (!monto || !categoria || !fecha) {
            alert("Por favor completa fecha, categoría y monto");
            return;
        }

        // actualizado boton: Validar q el monto sea numero mayor a 0
        const montoNumerico = parseFloat(monto);
        if (isNaN(montoNumerico) || montoNumerico <= 0) {
            alert("El monto debe ser un mayor a 0");
            return;
        }


        const nuevoGasto = {
            id: gastoEditando ? gastoEditando.id : Date.now(), // ID unico, se toma en microsegundos
            monto: monto,
            categoria: categoria,
            fecha: fecha,
            detalle: detalle
        };


        let nuevosGastos;


        if (gastoEditando) {
            // Actualisar gasto existente
            nuevosGastos = gastos.map(gasto => 
                gasto.id === gastoEditando.id ? nuevoGasto : gasto
            );
            setGastoEditando(null);
        } else {
            //agregar nuevo gasto
            nuevosGastos = [...gastos, nuevoGasto];
        }


        setGastos(nuevosGastos);
        setItem("gastos", nuevosGastos); //guarda array completo


        // limpia formulario
        setFecha("");
        setDetalle("");
        setCategoria("");
        setMonto("");
    }


    //Eliminar gasto
    function eliminarGasto(id) {
        const nuevosGastos = gastos.filter(gasto => gasto.id !== id);
        setGastos(nuevosGastos);
        setItem("gastos", nuevosGastos);
    }


    //Prepara edicion
    function editarGasto(gasto) {
        setFecha(gasto.fecha);
        setDetalle(gasto.detalle);
        setCategoria(gasto.categoria);
        setMonto(gasto.monto);
        setGastoEditando(gasto);
    }


    // Cancela edicion
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
                                        <option>Gastos Varios </option>
                                        <option>Transporte</option>
                                        <option>Almacén</option>
                                        <option>Esparcimiento</option>
                                        <option>Gimnasio</option>
                                        <option>Luz</option>
                                        <option>Celular</option>
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
                                {/*actualiza el boton: input solo acepta numeros! */}
                                <input class="input" type="number" placeholder="..."
                                    value={monto}
                                    min="0"
                                    step="any"
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
                            {gastoEditando ? "Aceptar" : "Agregar"}
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
                            <th></th>
                        </tr>
                    </thead>


                    {/*si gastos =/= 0, muestra todos los registros en gastos ++ boton de editar y eliminar */}
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