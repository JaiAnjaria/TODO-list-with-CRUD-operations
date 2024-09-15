import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
const app = express();
const port = 3000;
const date = new Date();
const month = date.toLocaleString('default', { month: 'long' })


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var items = []
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "Jaiisop412",
  port: 5432,
});
db.connect();
 app.get("/", async (req, res) => {
 const result = await db.query('select * from items order by id asc')
 
items = result.rows
  res.render("index.ejs", {
    listTitle:(`${month} ${date.getDate()}`) ,
    listItems: items
  });
});

app.post("/add", async(req, res) => {
  
  const item = req.body.newItem;
  const result = await db.query('insert into items(title) values ($1)',[item])
  
  res.redirect("/");
});

app.post("/edit",async (req, res) => {
 var  updatedtitle = req.body.updatedItemTitle
 var updatedItemId = req.body.updatedItemId
 const result =await db.query('update items set title = $1 where id = $2',[updatedtitle,updatedItemId])
 res.redirect('/')
  
});

app.post("/delete", async(req, res) => {
  var deletedId = req.body.deleteItemId
  const result  =await db.query('delete from items where id = ($1)',[deletedId])
  res.redirect('/')
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
  