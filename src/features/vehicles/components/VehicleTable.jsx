import StatusBadge from "./StatusBadge.jsx";

export default function VehicleTable({ vehicles, onEdit, onDelete }) {
  if (vehicles.length === 0) {
    return <p className="empty-message">No hay vehículos registrados.</p>;
  }

  return (
    <div className="table-container">
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Capacidad</th>
            <th>SOAT</th>
            <th>Rev. Técnica</th>
            <th>Permiso MTC</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <tr
              key={vehicle.id}
              className={
                vehicle.estado === "INHABILITADO" ? "row-disabled" : ""
              }
            >
              <td>{vehicle.placa}</td>
              <td>{vehicle.tipo}</td>
              <td>{vehicle.marca}</td>
              <td>{vehicle.modelo}</td>
              <td>{vehicle.anio}</td>
              <td>{vehicle.capacidadCargaKg} kg</td>
              <td>{vehicle.fechaVencimientoSoat}</td>
              <td>{vehicle.fechaVencimientoRevisionTecnica}</td>
              <td>{vehicle.fechaVencimientoPermisoMtc}</td>
              <td>
                <StatusBadge status={vehicle.estado} />
              </td>
              <td className="actions">
                <button onClick={() => onEdit(vehicle)}>Editar</button>
                <button
                  className="danger"
                  onClick={() => onDelete(vehicle.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}