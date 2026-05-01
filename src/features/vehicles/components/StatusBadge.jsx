export default function StatusBadge({ status }) {
  const normalizedStatus = status || "ACTIVO";

  const className =
    normalizedStatus === "INHABILITADO"
      ? "status-badge status-badge--disabled"
      : "status-badge status-badge--active";

  return <span className={className}>{normalizedStatus}</span>;
}