// src/components/StudentCard.jsx
import { useNavigate } from "react-router-dom";
import DefaultImage  from '../assets/default.jpg'
const StudentCard = ({ student, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#e0e7e0] group">
      <div className="p-6">
        <div>
          <img
            src={student.image || DefaultImage }
            alt={student.name}
            className="w-24 h-24 rounded-full mx-auto border-4 border-[#e0e7e0] group-hover:border-[#517551] transition-colors duration-300"
          />
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-lg font-bold text-[#2d4a2d]">{student.name}</h2>
          <p className="text-sm text-gray-500 font-semibold mt-1">
            {student.course}
          </p>

          {/* Student ID */}
          <p className="text-xs text-gray-400 font-semibold mt-2">
            ID: {student._id}
          </p>
        </div>

        <div className="flex justify-between gap-2 mt-6">
          <button
            onClick={() => {
              navigate(`/students/${student._id}`);
            }}
            className="flex-1 px-3 py-2 text-sm bg-[#e0e7e0] text-[#2d4a2d] rounded-lg hover:bg-[#d0dbd0] transition-colors cursor-pointer"
          >
            View
          </button>
          <button
            onClick={() => onDelete(student._id,student.name)}
            className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
