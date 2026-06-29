import { useState } from "react";

// Componente: Formulario para agregar/editar gastos
function GastosFormulario({ 
  fecha, 
  detalle, 
  categoria, 
  monto, 
  gastoEditando, 
  setFecha, 
  setDetalle, 
  setCategoria, 
  setMonto, 
  agregarGasto, 
  cancelarEdicion 
}) {

  return (
    <div>
      {/* Columna 1: input fecha */}
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

        {/* Columna 2: select categoria */}
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
        
        {/* Columna 3: input monto (solo numeros) */}
        <div className="column">
          <div class="field">
            <label class="label">Monto$</label>
            <div class="control">
              <input class="input" type="number" placeholder="..."
                value={monto}
                min="0"
                step="any"
                onChange={(e) => setMonto(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* textarea detalle */}
      <div class="field">
        <div class="control">
          <textarea class="textarea" placeholder="Detalle..."
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
          />
        </div>
      </div>
      
      {/* Botones: Agregar/Aceptar ++ Cancelar */}
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
    </div>
  );
}

export default GastosFormulario; 