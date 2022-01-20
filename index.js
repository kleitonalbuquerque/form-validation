const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

const app = express();

const port = 4400;

app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser("fdafasdfasdfasd"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(flash());

app.get("/", (req, res) => {
  var emailError = req.flash("emailError");
  var pontosError = req.flash("pontosError");
  var nomeError = req.flash("nomeError");
  var email = req.flash("email");
  var nome = req.flash("nome");

  emailError =
    emailError == undefined || emailError.length == 0 ? undefined : emailError;
  email = email == undefined || email.length == 0 ? "" : email;
  nome = nome == undefined || nome.length == 0 ? "" : nome;

  res.render("index", {
    emailError,
    pontosError,
    nomeError,
    email: email,
    nome: nome,
  });
});

app.post("/form", (req, res) => {
  var { email, nome, pontos } = req.body;

  var emailError;
  var pontosError;
  var nomeError;

  if (email == undefined || email == "") {
    emailError = "O e-mail não pode ser vazio";
  }

  if (pontos == undefined || pontos < 10) {
    pontosError = "Você não pode ter menos de 10 pontos";
  }

  if (nome == undefined || nome == "") {
    nomeError = "O nome não pode ser vazio";
  }

  if (nome.length < 4) {
    nomeError = "O nome é mt pequeno";
  }

  if (
    emailError != undefined ||
    pontosError != undefined ||
    nomeError != undefined
  ) {
    req.flash("emailError", emailError);
    req.flash("pontosError", pontosError);
    req.flash("nomeError", nomeError);

    req.flash("email", email);
    req.flash("nome", nome);

    res.redirect("/");
  } else {
    res.send("SHOW DE BOLA ESSE FORM!");
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log("Ops! Algo deu errado!");
  } else {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
  }
});
