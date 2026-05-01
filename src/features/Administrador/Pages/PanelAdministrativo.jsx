import React from 'react';
import { useAuth } from '../../Auth/Components/AuthComponente';

function PanelAdministrativo() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>🚚 Panel de Administrador</h1>
      <p>Bienvenido, {user?.email}</p>
      <p>Rol: {user?.rol}</p>
      <button onClick={logout}>Cerrar Sesión</button>
      
      <div>
        <h2>Gestión de Vehículos</h2>
        <p>Aquí van los vehículos...</p>
      </div>
    </div>
  );
}

export default PanelAdministrativo;
