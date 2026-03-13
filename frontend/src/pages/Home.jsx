// src/pages/Home.jsx
import { useState, useEffect } from "react";
import StudentCard from "../components/StudentCard";
import Form from "../components/Form";
import { useContext } from "react";
import { ApiContext } from "../context/APIcontext";

const Home = ({ searchTerm }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const APIURL=useContext(ApiContext)

  useEffect(() => {
    setLoading(true);
    if (!selectedCourse || selectedCourse.length === 0) {
      fetch(`${APIURL}/students`)
        .then((res) => res.json())
        .then((data) => {
          setStudents(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      fetch(
        `${APIURL}/students/course/${encodeURIComponent(selectedCourse)}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setStudents(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [selectedCourse]);

  const handleDelete = (id, name) => {
    if (
      window.confirm(
        `Are you sure you want to delete this student ${name.toUpperCase()} ?`,
      )
    ) {
      fetch(`${APIURL}/students/${id}`, {
        method: "DELETE",
      }).then(() => {
        setStudents((prev) => prev.filter((s) => s._id !== id));
      });
    }
  };
  const handleStudentAdded = (newStudent) => {
    if (!selectedCourse || newStudent.course === selectedCourse) {
      setStudents((prev) => [...prev, newStudent]);
    }
  };
  let courses = [
    "Full Stack Development",
    "Cloud Computing",
    "Artificial Intelligence",
    "Cyber Security",
    "Data Science",
    "Python Programming",
    "UI/UX Design",
    "MERN Stack",
  ];
  if (loading) {
    return (
      <div className="pt-32 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#517551]"></div>
      </div>
    );
  }

  return (
    <div className="pt-28 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto ">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2d4a2d]">
          Student Directory
        </h1>
        <p className="text-gray-600 mt-2">
          View and manage all enrolled students
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e0e7e0]">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-2xl font-bold text-[#2d4a2d]">{students.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e0e7e0]">
          <p className="text-sm text-gray-500">Active Courses</p>
          <p className="text-2xl font-bold text-[#2d4a2d]">{courses.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6  border border-[#e0e7e0]">
          <label className="text-sm text-gray-500">Filter By Courses</label>
          <select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
            }}
            className="bg-[#EBEBEB] p-2 rounded-md"
          >
            <option value="">Select Course</option>
            {courses.map((c, i) => (
              <option value={c} key={i}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button
          className="h-18 w-45 bg-[#DB5C5C] rounded-xl font-semibold"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add New Student
        </button>
      </div>
      {/* Student Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        {students
          .filter((student) => {
            if (!student) return false;
            if (!searchTerm) return true;

            const term = searchTerm.toLowerCase();

            return (
              student.name?.toLowerCase().includes(term) ||
              student.phone?.includes(term)
            );
          })
          .map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              onDelete={handleDelete}
            />
          ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Student</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <Form
                onClose={() => setIsModalOpen(false)}
                onStudentAdded={handleStudentAdded}
              />
            </div>
          </div>
        </div>
      )}
      {students.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No students found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
