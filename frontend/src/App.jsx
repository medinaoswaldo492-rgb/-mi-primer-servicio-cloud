import { useEffect, useState } from "react";

function App() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("Todas");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const API_URL =
    "https://script.google.com/macros/s/AKfycby3GA0y5BaYdnqXKElqWpnGZhSr2ak8KNuhtQO44DpfQdVgSQd_e0LXHLUCMFklUlBkzQ/exec";

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en el servidor");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data);
        setProductos(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
        setCargando(false);
      });
  }, []);

  const categorias = [
    "Todas",
    ...new Set(productos.map((producto) => producto.Categoria)),
  ];

  const productosFiltrados = productos.filter((producto) => {
    const nombre = producto.Nombre?.toString().toLowerCase() || "";
    const categoria = producto.Categoria || "";

    const coincideNombre = nombre.includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada === "Todas" ||
      categoria === categoriaSeleccionada;

    return coincideNombre && coincideCategoria;
  });

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>Mi Primer Servicio Cloud</h1>

      <p>
        Aplicación React consumiendo una API desarrollada con Google Apps
        Script y Google Sheets
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: "10px",
            flex: 1,
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <select
          value={categoriaSeleccionada}
          onChange={(e) =>
            setCategoriaSeleccionada(e.target.value)
          }
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        >
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {cargando && (
        <p>Cargando información desde el servidor...</p>
      )}

      {error && (
        <p
          style={{
            color: "#d32f2f",
            backgroundColor: "#ffebee",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          No fue posible conectar con el servicio.
        </p>
      )}

      {!cargando && !error && (
        <div
          style={{
            display: "grid",
            gap: "15px",
          }}
        >
          {productosFiltrados.length === 0 ? (
            <p>
              No se encontraron productos que coincidan con la búsqueda.
            </p>
          ) : (
            productosFiltrados.map((producto) => (
              <div
                key={producto.ID}
                style={{
                  border: "1px solid #e0e0e0",
                  padding: "15px 20px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    color: "#333",
                  }}
                >
                  {producto.Nombre}
                </h3>

                <p
                  style={{
                    margin: "4px 0",
                    color: "#2e7d32",
                    fontWeight: "bold",
                  }}
                >
                  Precio: ${producto.Precio}
                </p>

                <p
                  style={{
                    margin: "4px 0",
                    color: "#666",
                    fontSize: "14px",
                  }}
                >
                  Categoría:{" "}
                  <span>{producto.Categoria}</span>
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;