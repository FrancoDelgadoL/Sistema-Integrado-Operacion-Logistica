import { useEffect, useState } from 'react'

function App() {
  const [mensajeBackend, setMensajeBackend] = useState("Esperando al backend...")

  useEffect(() => {
    // Apuntamos al puerto 8000 donde vive FastAPI
    fetch("http://localhost:8000/")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        // Guardamos el mensaje que nos mandó Python
        setMensajeBackend(datos.mensaje)
      })
      .catch((error) => {
        console.error("Error:", error)
        setMensajeBackend("Error: No se pudo conectar al Backend")
      })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        SOL-CF-2026: Sistema Logístico
      </h1>
      <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-blue-500">
        <p className="text-gray-600 text-sm font-semibold uppercase mb-1">Estado de Conexión:</p>
        <p className="text-xl text-blue-600 font-medium">{mensajeBackend}</p>
      </div>
    </div>
  )
}

export default App
