
import { useState, useEffect } from "react";

function Home() {

    const [fecha, setFecha] = useState("");
    const [detalle, setDetalle] = useState("");

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
                                    <select>
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
                                <input class="input" type="text" placeholder="..." />
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
                        <button class="button is-link">Agregar</button>
                    </div>
                </div>

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

            </div>

        </>

    )
}



export default Home 