const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5225/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.message ||
        data?.mensaje ||
        data?.title ||
        "Ocurrió un error en la solicitud"
    );

    error.status = response.status;
    throw error;
  }

  return data;
}

export const vehicleApi = {
  getAll() {
    return request("/vehiculos");
  },

  create(vehicle) {
    return request("/vehiculos", {
      method: "POST",
      body: JSON.stringify(vehicle),
    });
  },

  update(id, vehicle) {
    return request(`/vehiculos/${id}`, {
      method: "PUT",
      body: JSON.stringify(vehicle),
    });
  },

  remove(id) {
    return request(`/vehiculos/${id}`, {
      method: "DELETE",
    });
  },
};