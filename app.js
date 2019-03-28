const express = require('express');
const app = express();
const mongoose = require("mongoose");

// Configuración
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongodb', { useNewUrlParser: true })
  .then(db => console.log('Db connected'))
  .catch(err => console.log(err));

mongoose.connection.on("error", function (e) { console.error(e); });

// Definición del schema
let schema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  name: String
});

// Definición del modelo
let Visitor = mongoose.model("Visitor", schema);

// Rutas
app.get('/', async (req,res) => {
  await Visitor.create({
    date: Date(),
    name: req.query.name ? req.query.name : 'Anónimo'
  });

  res.send('<h1>El visitante fue almacenado con éxito</h1>');
});

app.listen(3000, () => console.log('Listening on port 3000!'));