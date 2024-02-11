const con = require("./db");

// Function to insert a record into a table
const insertRecord = (tableName, record, callback) => {
  con.query(`INSERT INTO ${tableName} SET ?`, record, (err, result) => {
    if (err) {
      console.error("Error inserting record:", err);
      callback(err, null);
      return;
    }
    console.log("Record inserted successfully!");
    callback(null, result);
  });
};

const fetchAllRecord = (tableName, callback) => {
  con.query(`SELECT * FROM ${tableName}`, (err, result) => {
    if (err) {
      console.error("Error fetching records:", err);
      callback(err, null);
      return;
    }
    console.log("Records fetched successfully!");
    callback(null, result);
  });
};
const updateRecord = (tableName, updatedFields, condition, callback) => {
  con.query(
    `UPDATE ${tableName} SET completed = ${updatedFields} WHERE ${condition}`,
    (err, result) => {
      if (err) {
        console.error("Error updating record:", err);
        callback(err, null);
        return;
      }
      console.log(
        `UPDATE ${tableName} SET completed = ${updatedFields} WHERE ${condition}`
      );
      console.log("Record updated successfully!");
      callback(null, result);
    }
  );
};
const deleteRecord = (tableName, condition, callback) => {
  con.query(`DELETE FROM ${tableName} WHERE ${condition}`, (err, result) => {
    if (err) {
      console.error("Error deleting record:", err);
      callback(err, null);
      return;
    }
    console.log("Record deleted successfully!");
    callback(null, result);
  });
};

// Other database functions...

module.exports = {
  insertRecord,
  fetchAllRecord,
  updateRecord,
  deleteRecord,
  // Export other functions as needed
};
