var mysql = require("mysql");

// Create a connection to the MySQL server
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  insecureAuth: true,
  database: "tasks", // Specify the database name here
});

// Connect to the MySQL server
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL server!");

  // Create table after connecting to the database
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS task (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      description TEXT,
      completed BOOLEAN
    )
  `;

  con.query(createTableQuery, function (err, result) {
    if (err) throw err;
    console.log("Table 'task' created or already exists!");
  });
});

module.exports = con;
