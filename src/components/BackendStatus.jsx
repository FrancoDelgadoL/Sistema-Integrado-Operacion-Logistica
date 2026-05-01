import { useEffect, useState } from "react";

export default function BackendStatus() {
  const [mensajeBackend, setMensajeBackend] = useState(
    "Esperando al backend..."
  );

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setMensajeBackend(datos.mensaje);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMensajeBackend("Error: No se pudo conectar al Backend");
      });
  }, []);

  return (
    <div>
      <p>Estado de Conexión:</p>
      <p>{mensajeBackend}</p>
    </div>
  );
}