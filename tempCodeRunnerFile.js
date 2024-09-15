const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "Jaiisop412",
  port: 5432,
});
db.connect();