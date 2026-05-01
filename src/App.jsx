import { lazy, Suspense, useState } from "react";
import HomePage from "./components/HomePage.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const VehiclesPage = lazy(() =>
  import("./features/vehicles/pages/VehiclesPage.jsx")
);

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  function goToHome() {
    setCurrentPage("home");
  }

  function goToVehicles() {
    setCurrentPage("vehicles");
  }

  if (currentPage === "vehicles") {
    return (
      <ErrorBoundary onBack={goToHome}>
        <Suspense fallback={<p>Cargando módulo de vehículos...</p>}>
          <VehiclesPage onBack={goToHome} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return <HomePage onGoToVehicles={goToVehicles} />;
}

export default App;