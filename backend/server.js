const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let db = new sqlite3.Database("./contacts.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Conectado a la base de datos.");
});

app.get("/contacts", (req, res) => {
  const sql = "SELECT * FROM contacts";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Error al conectar a la base de datos." });
      return;
    }
    res.json(rows);
  });
});

app.post("/contacts", (req, res) => {
  const { name, phone } = req.body;

  // Validar datos
  if (!name || !phone || typeof name !== 'string' || typeof phone !== 'string') {
    res.status(400).json({ error: "Nombre y telefono son requeridos." });
    return;
  }

  const sql = "INSERT INTO contacts (name, phone) VALUES (?,?)";
  db.run(sql, [name, phone], function (err) {
    if (err) {
      res.status(500).json({ error: 'Error al crear contacto.' });
      return;
    }
    res.json({ id: this.lastID, name, phone });
  })
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
