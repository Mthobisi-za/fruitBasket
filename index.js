const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const PORT = process.env.PORT || 5000;
//---CONFIG MODULES
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  handlebars({ defaultLayout: "main", layoutsDir: "views/layouts" })
);
var connectionString = process.env.DATABASE_URL;
var pool;
if (connectionString) {
  pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
} else {
  pool = new Pool({
    user: "postgres",
    password: "mthobisi",
    database: "users",
    ssl: false,
    port: 5432,
  });
}

//---CONFIG MODULES
//----config Created modules
const useRoutes = require("./js/routes")(pool);
//----config Created modules
//--routes
/*
app.get("/", useRoutes.home);
app.post("/registerFruit", useRoutes.registerFruit);
app.get("/fruits", useRoutes.fruits);
app.get("/fruit/:fruitName", useRoutes.fruit);
app.post("/submit", useRoutes.update);
app.get("/reset", useRoutes.reset)*/
//--routes

app.listen(PORT, () => {
  console.log(">>>>server started on " + PORT);
});
