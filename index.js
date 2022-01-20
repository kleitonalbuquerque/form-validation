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
  res.render("index");
});

app.post("/form", (req, res) => {
  var { email, nome, pontos } = req.body;

  var emailError;
  var nomeError;
  var pontosError;

  if (email == undefined || email == "") {
    emailError = "E-mail não pode ser vazio";
  }

  if (nome == undefined || nome == "") {
    nomeError = "Nome não pode ser vazio";
  }

  if (nome.length < 4) {
    nomeError = "O nome deve ter mais que 4 caracteres";
  }

  if (pontos == undefined || pontos < 10) {
    pontosError = "Você não pode ter menos de 10 pontos";
  }

  if (
    emailError != undefined ||
    nomeError != undefined ||
    pontosError != undefined
  ) {
    res.redirect("/");
  } else {
    res.send("Show de bola esse form!");
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log("Ops! Algo deu errado!");
  } else {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
  }
});
