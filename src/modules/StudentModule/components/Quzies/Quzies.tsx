import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../config/httpClient";
import { QUIZ } from "../../../../config/api.endPoint";
import type { QuestionOfQuiz, SubmitAnswer } from "../../../InstractorModule/type";
import { useParams } from "react-router-dom";

export default function Quiz() {

    const { quizId } = useParams<{ quizId: string }>();

  const [questions, setQuestions] = useState<QuestionOfQuiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<SubmitAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [loading, setLoading] = useState(false);

 
  const getQuestions = async () => {

    try {

      setLoading(true);

      const response = await axiosInstance.get(
        QUIZ.WITHOUT_ANSWER(quizId!)
      );

      setQuestions(response.data);

    } catch (error: any) {

      toast.error(
        error.response?.data?.message || "Failed to load quiz"
      );

    } finally {

      setLoading(false);

    }

  };

  // next question
  const handleNext = () => {

    if (!selectedAnswer) {
      toast.warning("Please select an answer");
      return;
    }

    const currentQuestion = questions[currentIndex];

    const newAnswer: SubmitAnswer = {
      question: currentQuestion._id,
      answer: selectedAnswer
    };

    setAnswers((prev) => [...prev, newAnswer]);

    setSelectedAnswer("");

    setCurrentIndex((prev) => prev + 1);
  };

  const submitQuiz = async () => {

    try {

      const currentQuestion = questions[currentIndex];

      const finalAnswers = [
        ...answers,
        {
          question: currentQuestion._id,
          answer: selectedAnswer
        }
      ];

      await axiosInstance.post(
        QUIZ.SUBMIT(quizId!),
        {
          answers: finalAnswers
        }
      );

      toast.success("Quiz submitted successfully");

    } catch (error: any) {

      toast.error(
        error.response?.data?.message || "Submit failed"
      );

    }

  };

 useEffect(() => {

  if (!quizId) return;

  getQuestions();

}, [quizId]);

  if (loading) {

    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  }

  const currentQuestion = questions?.[currentIndex];

  const progress =
    questions.length > 0
      ? ((currentIndex + 1) / questions.length) * 100
      : 0;

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="w-[420px] bg-white p-6 rounded-xl shadow-lg space-y-6">

        <h1 className="text-xl font-bold text-center">
          Quiz
        </h1>

        <div className="text-center text-gray-500">
          {currentIndex + 1} / {questions.length}
        </div>

        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="bg-gray-500 h-2 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        {currentQuestion && (
          <>
            <h2 className="text-lg font-medium text-center">
              {currentQuestion.question}
            </h2>

            <div className="flex flex-col gap-3">

              {currentQuestion.answers.map((ans, index) => {

                const letter = String.fromCharCode(65 + index);

                return (
                  <label
                    key={index}
                    className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-100
                    ${selectedAnswer === letter ? "border-gray-500 bg-gray-50" : ""}
                    `}
                  >

                    <input
                      type="radio"
                      name={`question-${currentQuestion._id}`}
                      value={letter}
                      checked={selectedAnswer === letter}
                      onChange={() => setSelectedAnswer(letter)}
                      className="accent-gray-500"
                    />

                    <span>
                      {letter}. {ans}
                    </span>

                  </label>
                );

              })}

            </div>
          </>
        )}

        <div className="flex justify-end pt-4">

          {currentIndex < questions.length - 1 ? (

            <button
              onClick={handleNext}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg"
            >
              Next
            </button>

          ) : (

            <button
              onClick={submitQuiz}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg"
            >
              Submit
            </button>

          )}

        </div>

      </div>

    </div>

  );

}