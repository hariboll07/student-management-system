// src/pages/StudentDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DefaultImage from "../assets/default.jpg";
import Form from "../components/Form";
const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/students/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#517551]"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-600">Student not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-[#517551] text-white rounded-lg hover:bg-[#3f5d3f] transition-colors"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center text-[#517551] hover:text-[#3f5d3f] transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Directory
        </button>

        {/* Student Details Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-[#517551] to-[#3f5d3f] px-8 py-6">
            <h1 className="text-2xl font-bold text-white">Student Profile</h1>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="md:w-1/3">
                <img
                  src={student.image || DefaultImage}
                  alt={student.name}
                  className="w-full rounded-xl shadow-lg"
                />
              </div>

              {/* Details */}
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-[#2d4a2d] mb-4">
                  {student.name}
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#f8fafc] p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Student ID</p>
                      <p className="text-lg font-semibold text-[#2d4a2d]">
                        {student._id}
                      </p>
                    </div>

                    <div className="bg-[#f8fafc] p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Course</p>
                      <p className="text-lg font-semibold text-[#2d4a2d]">
                        {student.course}
                      </p>
                    </div>

                    {student.email && (
                      <div className="bg-[#f8fafc] p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-lg font-semibold text-[#2d4a2d]">
                          {student.email}
                        </p>
                      </div>
                    )}

                    {student.phone && (
                      <div className="bg-[#f8fafc] p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-lg font-semibold text-[#2d4a2d]">
                          {student.phone}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div></div>
                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => {
                      setIsEditOpen(true);
                    }}
                    className="px-6 py-2 bg-[#517551] text-white rounded-lg hover:bg-[#3f5d3f] transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 border border-[#517551] text-[#517551] rounded-lg hover:bg-[#f0f7f0] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Edit Student</h2>
              <button onClick={() => setIsEditOpen(false)}>✕</button>
            </div>

            <Form
              student={student}
              isEdit={true}
              onClose={() => setIsEditOpen(false)}
              onStudentAdded={(updatedStudent) => {
                setStudent(updatedStudent);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
