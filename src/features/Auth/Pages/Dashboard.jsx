import React from 'react';
import { useAuth } from '../Components/AuthComponente';
import AdminPanel from '../../Administrador/Pages/PanelAdministrativo';
import ConductorPanel from '../../Conductor/Pages/ConductorPanel';

function Dashboard() {
  const { user } = useAuth();
  console.log("📊 Dashboard - User:", user);
  console.log("📊 Dashboard - Rol:", user?.rol);
  // Redirigir según el rol
  if (user?.rol === 'ADMINISTRADOR') {
    console.log("✅ Redirigiendo a AdminPanel");
    return <AdminPanel />;
  }

  if (user?.rol === 'CONDUCTOR') {
    console.log("✅ Redirigiendo a ConductorPanel");
    return <ConductorPanel />;
  }
  console.log("⏳ No hay rol, mostrando loading...");
  return <div>Cargando...</div>;
}

export default Dashboard;