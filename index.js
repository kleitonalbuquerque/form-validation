const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const app = express();

const port = 4400;

app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(flash());

app.get("/", (req, res) => {
  res.send("<h1>Validação de Formulário</h1>");
});

app.listen(port, (error) => {
  if (error) {
    console.log("Ops! Algo deu errado!");
  } else {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
  }
});
