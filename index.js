const express = require("express");
const app = express();

//Crear un servidor con Express en el puerto 3000.
app.listen(3000, () => {
  console.log("Server ON");
});

//Definir la carpeta “assets” como carpeta pública del servidor.
app.use(express.static("assets"));

//Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios.
const nombres = ["Pedro", "Juan", "Paula", "Yasna", "Roberto"];
app.get("/abracadabra/usuarios", (req, res) => {
  res.json(nombres);
});

//Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en el servidor.
//En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario devolver la imagen “who.jpeg”.
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const { usuario } = req.params;
  nombres.includes(usuario) ? next() : res.redirect("/abracadabra/who");
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.sendFile(__dirname + "/assets/index.html");
});

app.get("/abracadabra/who", (req, res) => {
  res.sendFile(__dirname + "/assets/views/who.html");
});

//Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria.
//En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort.
app.get("/abracadabra/conejo/:n", (req, res) => {
  const random = Math.floor(Math.random() * (5 - 1) + 1);
  const { n } = req.params;
  random === Number(n)
    ? res.sendFile(__dirname + "/assets/views/rabbit.html")
    : res.sendFile(__dirname + "/assets/views/voldemort.html");
});

//Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor.
app.get("*", (req, res) => {
  res.send("Esta página no existe...");
});
