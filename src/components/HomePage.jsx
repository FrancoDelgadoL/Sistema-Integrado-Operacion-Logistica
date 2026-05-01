import BackendStatus from "./BackendStatus.jsx";

export default function HomePage({ onGoToVehicles }) {
  return (
    <main className="home-page">
      <section className="home-card">
        <h1>SOL-CF-2026: Sistema Logístico</h1>

        <p>
          Desde esta pantalla puedes validar la conexión con el backend e ingresar
          al módulo de gestión de vehículos.
        </p>

        <BackendStatus />

        <button className="primary-button" onClick={onGoToVehicles}>
          Ir a Gestión de Vehículos
        </button>
      </section>
    </main>
  );
}