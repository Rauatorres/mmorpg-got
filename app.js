const express = require("express")
const consign = require("consign")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const expressSession = require("express-session")
const app = express()

app.set("view engine", "ejs")
app.set("views", "src/views")

app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("src/public"))
app.use(expressValidator())
app.use(expressSession({
  secret: "fhdjsfkldfsk",
  resave: false,
  saveUninitialized: false
}))

consign().
  include("src/routes").
  then("src/model").
  then("src/controller").
  into(app)

app.listen(3000, ()=>{
  console.log('Successfully started server! Listening on http://localhost:3000')
  // console.log(app)
})