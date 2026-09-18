import { useEffect, useState } from "react";

function App() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
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

  // Obtener categorías únicas
  const categorias = [
    "Todas",
    ...new Set(productos.map((producto) => producto.Categoria)),
  ];

  // Filtrar productos por nombre y categoría
  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.Nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada === "Todas" ||
      producto.Categoria === categoriaSeleccionada;

    return coincideNombre && coincideCategoria;
  });

  return (
    <div>
      <h1>Mi Primer Servicio Cloud</h1>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      {/* Filtro por categoría */}
      <select
        value={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        style={{
          padding: "10px",
          marginLeft: "10px",
        }}
      >
        {categorias.map((categoria, index) => (
          <option key={index} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>

      <p>
        Aplicación React consumiendo una API desarrollada
        con Google Apps Script y Google Sheets
      </p>

      {cargando && <p>Cargando información...</p>}

      {error && (
        <p>
          No fue posible conectar con el servicio.
        </p>
      )}

      {!cargando && !error && (
        <div>
          {productosFiltrados.length === 0 ? (
            <p>No se encontraron productos que coincidan con la búsqueda.</p>
          ) : (
            productosFiltrados.map((producto) => (
              <div
                key={producto.ID}
                style={{
                  border: "1px solid gray",
                  padding: "15px",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              >
                <h2>{producto.Nombre}</h2>

                <p>
                  Precio: ${producto.Precio}
                </p>

                <p>
                  Categoría: {producto.Categoria}
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