const PLATE_REGEX = /^([A-Z]{3}|[A-Z][0-9][A-Z])-\d{3}$/;

export function normalizePlate(value) {
  const cleanValue = value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);

  if (cleanValue.length <= 3) return cleanValue;

  return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3)}`;
}

export function isExpired(dateValue) {
  if (!dateValue) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(`${dateValue}T00:00:00`);
  return date < today;
}

export function getVehicleStatus(vehicle) {
  const hasExpiredDocument =
    isExpired(vehicle.fechaVencimientoSoat) ||
    isExpired(vehicle.fechaVencimientoRevisionTecnica) ||
    isExpired(vehicle.fechaVencimientoPermisoMtc);

  return hasExpiredDocument ? "INHABILITADO" : "ACTIVO";
}

export function validateVehicle(vehicle, vehicles, editingVehicleId = null) {
  const errors = {};

  if (!vehicle.placa) {
    errors.placa = "La placa es obligatoria";
  } else if (!PLATE_REGEX.test(vehicle.placa)) {
    errors.placa = "Formato inválido. Usa ABC-123 o A1B-234";
  }

  const plateAlreadyExists = vehicles.some((item) => {
    const isSameVehicle = item.id === editingVehicleId;
    return !isSameVehicle && item.placa === vehicle.placa;
  });

  if (plateAlreadyExists) {
    errors.placa = "El número de placa ingresado ya existe en la flota";
  }

  if (!vehicle.tipo) errors.tipo = "El tipo es obligatorio";
  if (!vehicle.marca) errors.marca = "La marca es obligatoria";
  if (!vehicle.modelo) errors.modelo = "El modelo es obligatorio";
  if (!vehicle.anio) errors.anio = "El año es obligatorio";
  if (!vehicle.capacidadCargaKg) {
    errors.capacidadCargaKg = "La capacidad de carga es obligatoria";
  }

  if (!vehicle.fechaVencimientoSoat) {
    errors.fechaVencimientoSoat = "La fecha de SOAT es obligatoria";
  }

  if (!vehicle.fechaVencimientoRevisionTecnica) {
    errors.fechaVencimientoRevisionTecnica =
      "La fecha de Revisión Técnica es obligatoria";
  }

  if (!vehicle.fechaVencimientoPermisoMtc) {
    errors.fechaVencimientoPermisoMtc =
      "La fecha de Permiso MTC es obligatoria";
  }

  return errors;
}