import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./features/auth/Components/AuthComponente";
import Login from "./features/auth/pages/Login";
import Dashboard from "./features/auth/pages/Dashboard";  // 👈 NUEVO: Redirige por rol
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Carga perezosa de Vehículos
const VehiclesPage = lazy(() =>
  import("./features/vehicles/pages/VehiclesPage.jsx")
);

// Componente para rutas protegidas
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Componente VehiclesWrapper (mantiene tu lógica)
function VehiclesWrapper() {
  const navigate = useNavigate();
  return (
    <ErrorBoundary onBack={() => navigate("/")}>
      <Suspense fallback={<p>Cargando módulo de vehículos...</p>}>
        <VehiclesPage onBack={() => navigate("/")} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Configuración de rutas
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />  {/* 👈 AHORA USA DASHBOARD QUE REDIRIGE POR ROL */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/vehicles",
    element: (
      <ProtectedRoute>
        <VehiclesWrapper />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;