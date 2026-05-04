import mariadb from "mariadb";

async function connect(){
  const connection = await mariadb.createConnection({
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD
  })
}