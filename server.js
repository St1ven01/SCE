const express = require("express");
const XLSX = require("xlsx");
const cors = require("cors");

const app = express();
app.use(cors());

// Leer archivo Excel
const workbook = XLSX.readFile("datos.xlsx"); // tu archivo Excel
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

// Ruta de búsqueda
app.get("/buscar", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const resultados = data.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(query)
    )
  );
  res.json(resultados);
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
