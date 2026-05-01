import { useState } from "react";
import VehicleForm from "../components/VehicleForm.jsx";
import VehicleTable from "../components/VehicleTable.jsx";

export default function VehiclesPage({ onBack }) {
  const [vehicles, setVehicles] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);

  function handleSave(vehicle) {
    if (vehicleToEdit) {
      setVehicles((current) =>
        current.map((item) =>
          item.id === vehicleToEdit.id
            ? { ...vehicle, id: vehicleToEdit.id }
            : item
        )
      );
    } else {
      setVehicles((current) => [
        ...current,
        {
          ...vehicle,
          id: crypto.randomUUID(),
        },
      ]);
    }

    setVehicleToEdit(null);
    setIsFormOpen(false);
  }

  function handleEdit(vehicle) {
    setVehicleToEdit(vehicle);
    setIsFormOpen(true);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "¿Seguro que deseas eliminar este vehículo? Su historial de viajes se conservará."
    );

    if (!confirmed) return;

    setVehicles((current) => current.filter((item) => item.id !== id));
  }

  return (
    <main className="vehicles-page">
      <button className="secondary-button" onClick={onBack}>
        ← Volver al inicio
      </button>

      <section className="page-header">
        <div>
          <h2>Gestión de Vehículos</h2>
          <p>Registra, edita y consulta los vehículos de la flota.</p>
        </div>

        <button className="primary-button" onClick={() => setIsFormOpen(true)}>
          Registrar vehículo
        </button>
      </section>

      <VehicleTable
        vehicles={vehicles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <VehicleForm
        isOpen={isFormOpen}
        vehicleToEdit={vehicleToEdit}
        vehicles={vehicles}
        onClose={() => {
          setVehicleToEdit(null);
          setIsFormOpen(false);
        }}
        onSave={handleSave}
      />
    </main>
  );
}