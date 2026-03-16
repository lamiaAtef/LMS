import { useLocation } from "react-router-dom";
import type { ResultState } from "../type";

export default function ResultQuiz() {
  const location = useLocation();
  const state = location.state as ResultState;

  if (!state) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No result available</p>
      </div>
    );
  }

  const { quizTitle, score, total } = state;
  const percentage = ((score / total) * 100);
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const color =
  percentage >= 80 ? "#22c55e" :
  percentage >= 50 ? "#f59e0b" :"#ef4444";

  const message =
  percentage >= 90 ? "Perfect 🎉" :
  percentage >= 75 ? "Excellent 👏" :
  percentage >= 50 ? "Good job 👍" :
  "You must study harder 📚";

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold">{quizTitle.toUpperCase()} Quiz</h1>
        <h2 className="text-xl font-bold my-4">Result:</h2>
        <p className="text-lg ">
         <span className="font-bold"> Your score: </span> {score} / {total}  <br />
        </p>

        <div className="flex flex-col items-center mt-6">
          <svg width="140" height="140">
          
            {/* gray background */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="transparent"
            />

            {/* progress */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke={color}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
            />

            {/* percentage */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              className="text-xl font-bold fill-gray-700">
              {percentage}%
            </text>

          </svg>

          <p className="text-lg font-semibold mt-4">
            {message}
          </p>
        </div>
        
      </div>
     
    </div>
  );
}