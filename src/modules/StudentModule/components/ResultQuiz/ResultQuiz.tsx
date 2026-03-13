import { useLocation } from "react-router-dom";

type ResultState = {
  quizTitle: string;
  score: number;
  total: number;
};

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
  const percentage = ((score / total) * 100).toFixed(2);

  return (
    <div className="flex flex-col items-center py-16 min-h-screen bg-gray-100">
      <div className="w-full max-w-md h-auto mt-16 p-6 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold">{quizTitle.toUpperCase()} Quiz</h1>
        <h2 className="text-xl font-bold my-4">Result:</h2>
        <p className="text-lg ">
         <span className="font-bold"> Your score: </span> {score} / {total}  <br />
         <span className="font-bold">Percentage: </span> {percentage}%
        </p>
        <button className="bg-green-500 cursor-pointer text-white px-3 py-3 mt-5">Check your answers</button>
        
      </div>
     
    </div>
  );
}