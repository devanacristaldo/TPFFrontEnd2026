import { useState, useEffect } from "react";
import { setItem, getItem } from "./utils/localStorage";
import GastosFormulario from "./GastosFormulario"; 
import GastosTabla from "./GastosTabla";  

// Componente principal: Home (gestion estado y logica)
function Home() {

  //Datos
  const [fecha, setFecha] = useState("");  
  const [detalle, setDetalle] = useState(""); 
  const [categoria, setCategoria] = useState("");  
  const [monto, setMonto] = useState("");  

  //Array donde se guardan todos los gastos
  const [gastos, setGastos] = useState([]);  

  //bandera que muestra si se esta actualizando o editando, + va a traer datos de GastosTabla
  const [gastoEditando, setGastoEditando] = useState(null);  

  // Cargar gastos guardados al iniciar
  useEffect(() => {  
    const gastosGuardados = getItem("gastos"); 
    if (gastosGuardados) {
      setGastos(gastosGuardados); 
    }
  }, []);  // [] hace q solo se active al montar


  function agregarGasto() { 
    
    // Valida que los campos esten correctamente puestos ++ que monto sea un numero
    if (!monto || !categoria || !fecha) {
      alert("Por favor completa fecha, categoría y monto");
      return;
    }
    const montoNumerico = parseFloat(monto); 
    if (isNaN(montoNumerico) || montoNumerico <= 0) { 
      alert("El monto debe ser un mayor a 0");
      return;
    }

    //declara un nuevo gasto
    const nuevoGasto = {
      id: gastoEditando ? gastoEditando.id : Date.now(), // ID unico, se toma en milisegundos
      monto: monto,
      categoria: categoria,
      fecha: fecha,
      detalle: detalle
    };

    let nuevosGastos;  // Variable nuevo array

    //si gasto.id == gastoEditado.id: se remplazara gasto por gastoEditado, si no se remplazara gasto por si mismo
    if (gastoEditando) { 
      nuevosGastos = gastos.map(gasto => 
        gasto.id === gastoEditando.id ? nuevoGasto : gasto
      );
      setGastoEditando(null);  // Resetea el valor de gastoEditado para poder volver a usarlo de pivote
    } else {  
      nuevosGastos = [...gastos, nuevoGasto]; //si !gastoEditado entonces solo se agrega al Array de gastos
    }

    setGastos(nuevosGastos);
    setItem("gastos", nuevosGastos); //guarda array completo

    // limpia formulario
    setFecha("");  
    setDetalle("");  
    setCategoria(""); 
    setMonto(""); 
  }

  // Elimina el gasto cuyo id coincide, actualiza el estado y guarda el nuevo listado
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
      <h1>Trabajo Practico Final</h1>  

      <div>
        
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

        <GastosTabla 
          gastos={gastos}
          editarGasto={editarGasto}
          eliminarGasto={eliminarGasto}
        />
      </div>

 <footer className="footer has-text-centered">
      <div className="content">
        <p>Ana Luz M. Cristaldo</p>
      </div>
    </footer>

    </>
  );
}

export default Home;  // Exporta componente principal