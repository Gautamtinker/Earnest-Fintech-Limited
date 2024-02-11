const {
  insertRecord,
  fetchAllRecord,
  updateRecord,
  deleteRecord,
} = require("../models/Databasefunction");
const con = require("../models/db");

exports.insertTask = (req, res) => {
  try {
    console.log(req);
    const { taskTitle, taskDescription, iscompleted } = req.body;
    if (!taskDescription || !taskTitle) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    insertRecord(
      "task",
      {
        title: taskTitle,
        description: taskDescription,
        completed: iscompleted,
      },
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ status: "error", message: "Failed to insert record" });
        }
        res
          .status(200)
          .json({ status: "success", message: "Record inserted successfully" });
      }
    );
  } catch (Error) {
    console.log(Error);
    return res.status(500).json({ message: Error.message });
  }
};
exports.fetchAllTask = (req, res) => {
  try {
    fetchAllRecord("task", (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      // Send the fetched records as a response
      res.status(200).json({ tasks: result });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.fetchSingleTask = (req, res) => {
  try {
    const { taskTitle, taskDescription } = req.body;
    if (!taskDescription || !taskTitle) {
      return res.status(500).json({
        status: "error",
        message: "This is required fields for fetching single record",
      });
    }
    fetchAllRecord("task", (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      const singleRecord = result.filter(
        (e) => e.title === taskTitle && e.description === taskDescription
      );
      console.log(singleRecord);
      res.status(200).json({ status: "succes", singleRecord });
      // Send the fetched records as a response
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updatedTask = (req, res) => {
  try {
    const { taskTitle, taskDescription, iscompleted } = req.body;
    if (!taskDescription || !taskTitle) {
      return res.status(500).json({
        status: "error",
        message: "Please provide taskTitle, taskDescription",
      });
    }
    const condition = `title = '${taskTitle}' AND description = '${taskDescription}'`;
    const updatedFields = { completed: iscompleted };

    updateRecord("task", iscompleted, condition, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      // If the update was successful, fetch the updated record and send it as a response
      const updatedRecord = result;
      res.status(200).json({ status: "success", updatedRecord });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.deleteTask = (req, res) => {
  try {
    const { taskTitle, taskDescription } = req.query;
    console.log(taskTitle, taskDescription);
    if (!taskDescription || !taskTitle) {
      return res.status(500).json({
        status: "error",
        message: "Please provide taskTitle, taskDescription",
      });
    }
    // Call the deleteRecord function with the table name ("task") and the taskId to delete
    deleteRecord(
      "task",
      `title = '${taskTitle}' AND description = '${taskDescription}'`,
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        // Check if any record was deleted
        if (result.affectedRows === 0) {
          return res.status(404).json({
            message: "No record found with the provided title and description",
          });
        }

        // Send a success response if the record was successfully deleted
        res
          .status(200)
          .json({ status: "success", message: "Record deleted successfully" });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
