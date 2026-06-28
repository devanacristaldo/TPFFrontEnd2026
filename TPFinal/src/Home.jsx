import { useState, useEffect } from "react";
import { setItem, getItem } from "./utils/localStorage";
import GastosFormulario from "./GastosFormulario";  // Importara formulario
import GastosTabla from "./GastosTabla";  // Importara la tabla

// Componente principal: Home (gestiona estado y logica)
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
  }, []);  // [] hace q solo se active al montar

  // Agregar o actualizar gasto
  function agregarGasto() {  
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

    let nuevosGastos;  // Variable nuevo array

    if (gastoEditando) { 
      nuevosGastos = gastos.map(gasto => 
        gasto.id === gastoEditando.id ? nuevoGasto : gasto
      );
      setGastoEditando(null);  // Resetea edicion
    } else {  
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

  // Cancela edicion (clear todo)
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
        {/* Componente formulario: pasa estado + funciones */}
        <GastosFormulario 
          fecha={fecha}
          detalle={detalle}
          categoria={categoria}
          monto={monto}
          gastoEditando={gastoEditando}
          setFecha={setFecha}
          setDetalle={setDetalle}
          setCategoria={setCategoria}
          setMonto={setMonto}
          agregarGasto={agregarGasto}
          cancelarEdicion={cancelarEdicion}
        />

        {/* Componente tabla: pasa gastos + funciones */}
        <GastosTabla 
          gastos={gastos}
          editarGasto={editarGasto}
          eliminarGasto={eliminarGasto}
        />
      </div>
    </>
  );
}

export default Home;  // Exporta componente principal