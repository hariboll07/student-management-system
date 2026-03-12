const express = require("express");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
let data = require("./Data.json");
const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

//mongodb
let ConnectingDB = mongoose.connect("mongodb://localhost:27017/StudentsData");
ConnectingDB.then(() => {
  console.log("DB is connected");
}).catch((error) => {
  console.log(error, "DB is not connected");
});

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
  }
)

let studentModel = mongoose.model("Student_Details", studentSchema);
// let submittedDetails = studentModel.create(data);
// submittedDetails
//   .then(() => {
//     console.log("data is submitted");
//   })
//   .catch((error) => {
//     console.log("data is not submitted", error);
//   });

app.get("/students", async (req, res) => {
  try {
    let data = await studentModel.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 2. GET single student by ID
app.get("/students/:id", async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/students/course/:courseName", async (req, res) => {
  try {
    const students = await studentModel.find({ course: req.params.courseName });
    if (!students) {
      return res.status(404).json({ message: "Students not found" });
    }
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// delete single student by ID
app.delete("/students/:id", async (req, res) => {
  try {
    const student = await studentModel.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// edit single student by ID
app.put("/students/:id", async (req, res) => {
  try {
    const student = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ADD student
app.post("/students", async (req, res) => {
  try {
    const student = await studentModel.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
