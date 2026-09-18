import { useEffect, useState } from "react";

function App() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

const productosFiltrados = productos.filter((producto) => {
  const coincideNombre = producto.nombre
    .toLowerCase()
    .includes(busqueda.toLowerCase());

  const coincideCategoria =
    categoria === "Todas" || producto.categoria === categoria;

  return coincideNombre && coincideCategoria;
});

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

  return (
    <div>
      <h1>Mi Primer Servicio Cloud</h1>

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

      <select
  value={categoria}
  onChange={(e) => setCategoria(e.target.value)}
  style={{
    padding: "10px",
    marginBottom: "20px",
    marginLeft: "10px"
  }}
>
  <option value="Todas">Todas las categorías</option>
  <option value="Computadoras">Computadoras</option>
  <option value="Accesorios">Accesorios</option>
  <option value="Redes">Redes</option>
  <option value="Almacenamiento">Almacenamiento</option>
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

      {!cargando &&
        !error &&
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
        ))}
    </div>
  );
}

export default App;