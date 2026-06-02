
import { useState, useEffect } from "react";

function Home() {

    const [fecha, setFecha] = useState("");

    return (
        <>
            <h1>TP Final Dev-01</h1>
            <div>
                <div className="container mt-5">
                    <h2>Fecha</h2>

                    <div className="mb-3">
                        <label htmlFor="fecha" className="form-label">
                            Selecciona una fecha:
                        </label>
                        <input
                            type="date"
                            id="fecha"
                            className="form-control"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />
                    </div>

                    <p>Fecha seleccionada: {fecha}</p>
                </div>


                <div class="field">
                    <label class="label">Monto$</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Text input" />
                    </div>
                </div>


                <div class="field">
                    <label class="label">Categoria</label>
                    <div class="control">
                        <div class="select">
                            <select>
                                <option>Select dropdown</option>
                                <option>Transporte</option>
                                <option>Almacén</option>
                                <option>Gastos Personales</option>
                                <option>Internet</option>

                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Detalle</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Detalle"></textarea>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link">Agregar</button>
                    </div>
                </div>

            </div>

        </>

    )
}



export default Home 