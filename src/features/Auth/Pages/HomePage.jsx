import { useAuth } from "../features/auth/contexts/AuthContext";
// components/HomePage.jsx
function HomePage({ onGoToVehicles, user }) {
  return (
    <div className="home-container">
      <header>
        <h1>🚚 Sistema de Logística</h1>
        {user && (
          <div className="user-info">
            <span>👋 {user.email}</span>
            <small>({user.rol})</small>
          </div>
        )}
      </header>
      
      <main>
        <button onClick={onGoToVehicles}>
          Gestionar Vehículos
        </button>
      </main>
    </div>
  );
}



function HomePage({ onGoToVehicles }) {
  const { user, logout } = useAuth();

  return (
    <div className="home-container">
      <header>
        <h1>🚚 Sistema de Logística</h1>
        <div className="user-section">
          <span>👋 {user?.email} ({user?.rol})</span>
          <button onClick={logout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </header>
      
      <main>
        <button onClick={onGoToVehicles}>
          Gestionar Vehículos
        </button>
      </main>
    </div>
  );
}

export default HomePage;