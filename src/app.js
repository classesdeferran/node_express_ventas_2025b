// Cargar las dependencias
const express = require("express");

// Instancia del servidor
const app = express();

// Puerto del servidor
process.loadEnvFile();
const PORT = process.argv[2] || process.env.PORT || 8888;

// Obtener los datyos para la API
const ventas = require("../data/ventas.json");

// ruta inicial
app.get("/", (req, res) => {
  res.send("<h1>Pruebas de API con Express</h1>");
});

// api con todos los datos
// orden en forma descendente
// filtrado por un país
// parámetros de query
// http://localhost:12345/api?orden=desc&pais=Italia
app.get("/api", (req, res) => {
  const queryPais = req.query.pais;
  const queryOrden = req.query.orden || "asc";

  if (!req.query.pais) {
    return res.json(ventas);
  }

  // Filtrar por el nombre del país indicado en la query
  let ventasFiltradas = ventas.filter(
    (venta) => venta.pais.toLocaleLowerCase() === queryPais.toLocaleLowerCase()
  );

  if (ventasFiltradas.length === 0) {
    res.send(`<p> El país ${queryPais} no figura en nuestros datos.`);
    return;
  }
  if (queryOrden === "desc") {
    let ventasOrdenadas = ventasFiltradas.sort((a, b) => b.anyo - a.anyo);
    res.json(ventasOrdenadas);
    return;
  } else {
    let ventasOrdenadas = ventasFiltradas.sort((a, b) => a.anyo - b.anyo);
    res.json(ventasOrdenadas);
    return;
  }
  res.json(ventasFiltradas);
});

// Parámetros de url
// Ventas por año
app.get("/api/year/:year", (req, res) => {
    const paramsYear = req.params.year

    // Obtener las ventas por cada año
    let ventasFiltradas = ventas.filter(venta => venta.anyo == paramsYear)

    if(ventasFiltradas.length === 0) {
        return res.send(`<p> El año ${paramsYear} no figura en nuestros datos.`);    
    }

    res.json(ventasFiltradas)

})

// Mensaje para las rutas no definidas anteriormente:
// Error 404. Página no encontrada.
app.use((req, res) => {
  res.status(404).send("<h1>Error 404. Página no encontrada.</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`);
});
