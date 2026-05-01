import React from 'react';
import { useAuth } from '../../Auth/Components/AuthComponente';

function ConductorPanel() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>🚛 Panel de Conductor</h1>
      <p>Bienvenido, {user?.email}</p>
      <p>Rol: {user?.rol}</p>
      <button onClick={logout}>Cerrar Sesión</button>
      
      <div>
        <h2>Mis Rutas</h2>
        <p>Aquí van las rutas del conductor...</p>
      </div>
    </div>
  );
}

export default ConductorPanel;
