import { useEffect, useState } from "react";
import { vehicleApi } from "../api/vehicleApi.js";

export default function useVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadVehicles() {
    try {
      setLoading(true);
      const data = await vehicleApi.getAll();
      setVehicles(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  async function createVehicle(vehicle) {
    await vehicleApi.create(vehicle);
    await loadVehicles();
  }

  async function updateVehicle(id, vehicle) {
    await vehicleApi.update(id, vehicle);
    await loadVehicles();
  }

  async function deleteVehicle(id) {
    await vehicleApi.remove(id);
    await loadVehicles();
  }

  useEffect(() => {
    loadVehicles().catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  return {
    vehicles,
    loading,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  };
}