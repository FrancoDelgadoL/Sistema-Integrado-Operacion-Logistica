import { useEffect, useState } from "react";
import {
  getVehicleStatus,
  normalizePlate,
  validateVehicle,
} from "../utils/vehicleRules.js";

const emptyForm = {
  placa: "",
  tipo: "Camión",
  marca: "",
  modelo: "",
  anio: "",
  capacidadCargaKg: "",
  fechaVencimientoSoat: "",
  fechaVencimientoRevisionTecnica: "",
  fechaVencimientoPermisoMtc: "",
};

export default function VehicleForm({
  isOpen,
  vehicleToEdit,
  vehicles,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(vehicleToEdit);

  useEffect(() => {
    setForm(vehicleToEdit || emptyForm);
    setErrors({});
  }, [vehicleToEdit, isOpen]);

  if (!isOpen) return null;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: name === "placa" ? normalizePlate(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const vehicle = {
      ...form,
      anio: Number(form.anio),
      capacidadCargaKg: Number(form.capacidadCargaKg),
      estado: getVehicleStatus(form),
    };

    const validationErrors = validateVehicle(
      vehicle,
      vehicles,
      vehicleToEdit?.id
    );

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await onSave(vehicle);
  }

  return (
    <div className="modal-backdrop">
      <form className="vehicle-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <div>
            <h2>{isEditing ? "Editar vehículo" : "Registrar vehículo"}</h2>
            <p>Completa los datos obligatorios del vehículo.</p>
          </div>

          <button type="button" className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="form-grid">
          <Field
            label="Placa"
            name="placa"
            value={form.placa}
            error={errors.placa}
            onChange={handleChange}
            placeholder="ABC-123"
          />

          <SelectField
            label="Tipo"
            name="tipo"
            value={form.tipo}
            error={errors.tipo}
            onChange={handleChange}
            options={["Camión", "Furgón", "Tráiler", "Camioneta"]}
          />

          <Field
            label="Marca"
            name="marca"
            value={form.marca}
            error={errors.marca}
            onChange={handleChange}
          />

          <Field
            label="Modelo"
            name="modelo"
            value={form.modelo}
            error={errors.modelo}
            onChange={handleChange}
          />

          <Field
            label="Año"
            name="anio"
            type="number"
            value={form.anio}
            error={errors.anio}
            onChange={handleChange}
          />

          <Field
            label="Capacidad de carga kg"
            name="capacidadCargaKg"
            type="number"
            value={form.capacidadCargaKg}
            error={errors.capacidadCargaKg}
            onChange={handleChange}
          />

          <Field
            label="Vencimiento SOAT"
            name="fechaVencimientoSoat"
            type="date"
            value={form.fechaVencimientoSoat}
            error={errors.fechaVencimientoSoat}
            onChange={handleChange}
          />

          <Field
            label="Vencimiento Revisión Técnica"
            name="fechaVencimientoRevisionTecnica"
            type="date"
            value={form.fechaVencimientoRevisionTecnica}
            error={errors.fechaVencimientoRevisionTecnica}
            onChange={handleChange}
          />

          <Field
            label="Vencimiento Permiso MTC"
            name="fechaVencimientoPermisoMtc"
            type="date"
            value={form.fechaVencimientoPermisoMtc}
            error={errors.fechaVencimientoPermisoMtc}
            onChange={handleChange}
          />
        </div>

        <div className="calculated-status">
          Estado calculado: <strong>{getVehicleStatus(form)}</strong>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>

          <button type="submit" className="primary-button">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder = "",
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <small>{error}</small>}
    </label>
  );
}

function SelectField({ label, name, value, onChange, error, options }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <small>{error}</small>}
    </label>
  );
}