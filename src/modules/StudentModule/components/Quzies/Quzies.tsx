import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../config/httpClient";
import { QUIZ_URLS } from "../../../../config/api.endPoint";
import type { SubmitAnswer, QuestionType } from "../type";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function Quzies() {
  const { quizId } = useParams<{ quizId: string }>();

  const [quizTitle, setQuizTitle] = useState<string>("");
  const navigate = useNavigate();
  const [scorePerQuestion, setScorePerQuestion] = useState(0);

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<SubmitAnswer[]>([]);
  const [loading, setLoading] = useState(false);

  const getQuestions = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        QUIZ_URLS.WITHOUT_ANSWER(quizId!)
      );
    
      // quizData: all data from api
      const quizData = response.data?.data; 
      // apiQuestions: question data
      const apiQuestions = quizData?.questions || [];
  
      // convert options(answers) object → array and formate question info
      const formattedQuestions: QuestionType[] = apiQuestions.map((q: any) => ({
        _id: q._id,
        question: q.title,
        answers: Object.values(q.options)
      }));
  
      setQuizTitle(quizData.title); // quiz title
      setScorePerQuestion(quizData.score_per_question); // score per question
      setQuestions(formattedQuestions);

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (!quizId) return;
    getQuestions();
  }, [quizId]);

  // function to moving to next question
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

    setAnswers(prev => [...prev, newAnswer]);
    setSelectedAnswer("");
    setCurrentIndex(prev => prev + 1);
  };

  // submit quiz
  const submitQuiz = async () => {
    if (!selectedAnswer) {
      toast.warning("Please select an answer before submitting");
      return;
    }

    const finalAnswers = [
      ...answers,
      { question: questions[currentIndex]._id, answer: selectedAnswer }
    ];

    try {
    const response= await axiosInstance.post(QUIZ_URLS.SUBMIT(quizId!), { answers: finalAnswers });
      toast.success("Quiz submitted successfully");
      
      // score 
    const studentScore = response.data?.data?.score || 0;
    const totalScore = questions.length * scorePerQuestion; // score_per_question × num_questions
    
    // navigate to result page
    navigate(`/dashboard/quzies/${quizId}/result`, {
      state: { quizTitle, score: studentScore, total: totalScore }
    });
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Submit failed");
      
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-170 bg-white p-6 rounded-xl shadow-lg space-y-6">
        <h1 className="text-xl font-bold">{quizTitle.toUpperCase() || "Quiz"} Quiz</h1>
        <div className="text-center text-gray-500">
          Question {currentIndex + 1} of {questions.length}
        </div>

        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="bg-green-500 h-2 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        {currentQuestion && (
          <>
            <h2 className="text-lg font-medium my-4">{currentIndex + 1}. {currentQuestion.question} ?</h2>

            <div className="flex flex-col gap-3">
              {currentQuestion.answers.map((ans, index) => {
                const letter = String.fromCharCode(65 + index);
                return (
                  <label
                    key={index}
                    className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-100
                    ${selectedAnswer === letter ? "border-gray-500 bg-gray-50" : ""}`}
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
              className="bg-green-500 text-white px-6 py-2 rounded-lg cursor-pointer"
            >
              Next
            </button>
          ) : (
            <button
              onClick={submitQuiz}
              className="bg-green-500 text-white px-6 py-2 rounded-lg cursor-pointer">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}