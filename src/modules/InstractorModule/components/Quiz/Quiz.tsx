import { LuAlarmClockPlus } from "react-icons/lu";
import { BsFillSafe2Fill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../config/httpClient";
import { GROUPS_URLS, QUIZ_URLS } from "../../../../config/api.endPoint";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import quizImg1 from "../../../../assets/images/QuizImg/QuizImg1.png";
import quizImg2 from "../../../../assets/images/QuizImg/QuizImg2.png";
import type { GetGroupResponse, Quiz } from "../../type.ts";
import CustomDialog from "../../../../shared/components/CustomDialog/CustomDialog.tsx";
import { useForm } from "react-hook-form";
import InstructorInput from "../../../../shared/components/ui/InstructorInput/InstructorInput.tsx";
import { Textarea } from "flowbite-react";
import InfoCard from "../../../../shared/components/InfoCard.tsx/InfoCard.tsx";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import CodeModal from "../ui/CodeModal/CodeModal.tsx";
import { REQUIRED_VALIDATION } from "../../../../config/validation.ts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// نوع جديد للـ form يشمل date و time
type QuizForm = Quiz & { date: string; time: string };

export default function Quiz() {
  const [showModal, setShowModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeValue, setCodeValue] = useState("0");
  const [completedQuizes, setCompletedQuizes] = useState<Quiz[]>([]);

  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [loadingQuizCompleted, setLoadingQuizCompleted] = useState(false);

  const [upCommingQuiz, setUpCommingQuiz] = useState<Quiz[]>([]);
  const [allGroups, setAllGroups] = useState<GetGroupResponse[]>([]);

  const quizzesImgs = [quizImg1, quizImg2];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuizForm>();

  const getUpcommingQuiz = async () => {
    setLoadingUpcoming(true);
    try {
      const response = await axiosInstance.get(QUIZ_URLS.FIRST_INCOMMING);
      setUpCommingQuiz(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Can't show upcoming quizzes");
    } finally {
      setLoadingUpcoming(false);
    }
  };

  const getAllGroups = async () => {
    try {
      const response = await axiosInstance.get(GROUPS_URLS.GET_ALL);
      setAllGroups(response.data);
    } catch (error: any) {
      toast.error("Can't fetch groups");
    }
  };

  const completedQuiz = async () => {
    setLoadingQuizCompleted(true);
    try {
      const response = await axiosInstance.get(QUIZ_URLS.LAST_COMPLETED);
      setCompletedQuizes(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Can't show completed quizzes");
    } finally {
      setLoadingQuizCompleted(false);
    }
  };

  const onSubmit = async (data: QuizForm) => {
    const schadule = `${data.date}T${data.time}:00`;
    const { date, time, ...rest } = data;
    const finalData = { ...rest, schadule };

    try {
      const response = await axiosInstance.post(QUIZ_URLS.CREATE_QUIZ, finalData);
      toast.success(response.data.data.message || "Quiz created successfully");
      setCodeValue(response.data.data.code);
      setShowCodeModal(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create quiz");
    }

    setShowModal(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString("en-GB");
    const time = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    return { day, time };
  };

  const showNewModal = () => {
    reset();
    setShowModal(true);
  };

  useEffect(() => {
    getUpcommingQuiz();
    getAllGroups();
    completedQuiz();
  }, []);

  return (
    <>
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-4 h-screen">
        {/* Left column buttons */}
        <div className="flex">
          <button
            id="new_quiz"
            className="outline-none bg-[#fff] cursor-pointer w-50 me-4 p-5 border-2 border-[#00000033] rounded-lg flex items-center justify-center flex-col h-40"
            onClick={showNewModal}
          >
            <LuAlarmClockPlus size={50} /> new Quiz
          </button>
          <button
            id="question_bank"
            className="outline-none bg-[#fff] cursor-pointer w-50 me-4 p-5 border-2 border-[#00000033] rounded-lg flex items-center justify-center flex-col h-40"
          >
            <BsFillSafe2Fill size={50} />
            Question Bank
          </button>
        </div>

        {/* Right column upcoming and completed quizzes */}
        <div>
          {/* Upcoming Quizzes */}
          <div className="border-[#00000033] border-2 p-4 rounded-lg my-5 h-75 overflow-auto">
            <h2 className="mb-3 font-bold">Upcoming quizzes</h2>
            {loadingUpcoming ? (
              [...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                  <Skeleton width={80} height={80} className="rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width="75%" height={16} />
                    <Skeleton width="50%" height={12} />
                  </div>
                  <Skeleton width={24} height={24} className="rounded-full" />
                </div>
              ))
            ) : upCommingQuiz.length > 0 ? (
              upCommingQuiz.map((quiz, index) => (
                <InfoCard
                  key={quiz._id}
                  image={quizzesImgs[index % quizzesImgs.length]}
                  title={quiz.title}
                  subtitle={`${formatDate(quiz.schadule).day} | ${formatDate(quiz.schadule).time}`}
                  numberStudents={0}
                  link={`/instructor/quiz/${quiz._id}`}
                  linkClassName="text-sm font-semibold hover:text-lime-600"
                  arrowClassName="text-lime-300"
                />
              ))
            ) : (
              "No data"
            )}
          </div>

          {/* Completed Quizzes Table */}
          <div className="border-[#00000033] border-2 rounded-lg p-5 overflow-auto">
            <div className="flex justify-between px-3">
              <h2 className="mb-3 font-bold">Completed Quizzes</h2>
              <Link to="" className="flex items-center">
                <span className="me-3">result</span>
                <FaArrowRight color="#C5D86D" />
              </Link>
            </div>
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
              <div className="shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-black text-white uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Title</th>
                      <th className="px-6 py-4 font-semibold">Group Name</th>
                      <th className="px-6 py-4 font-semibold">Persons</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {loadingQuizCompleted ? (
                      [...Array(4)].map((_, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4"><Skeleton width={96} height={16} /></td>
                          <td className="px-6 py-4"><Skeleton width={80} height={16} /></td>
                          <td className="px-6 py-4"><Skeleton width={40} height={16} /></td>
                          <td className="px-6 py-4"><Skeleton width={96} height={16} /></td>
                        </tr>
                      ))
                    ) : completedQuizes.length > 0 ? (
                      completedQuizes.map((completedQuiz) => (
                        <tr key={completedQuiz._id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 font-medium text-gray-900">{completedQuiz.title}</td>
                          <td className="px-6 py-4">{completedQuiz.group}</td>
                          <td className="px-6 py-4">{completedQuiz.participants}</td>
                          <td className="px-6 py-4">{new Date(completedQuiz.schadule).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-6 text-gray-400">No Data</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomDialog
        title="Set up a new quiz"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Quiz Form */}
        <h2>Details</h2>
        <InstructorInput label="Title:">
          <input className="w-full p-2 outline-none" {...register("title", REQUIRED_VALIDATION("title"))} />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </InstructorInput>

        {/* Duration / Questions / Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <InstructorInput label="Duration (in minutes)">
            <select className="w-full p-2 outline-none" {...register("duration", REQUIRED_VALIDATION("duration"))}>
              {[1,5,10,15,20,30,45,60].map((min) => <option key={min} value={min}>{min} min</option>)}
            </select>
          </InstructorInput>

          <InstructorInput label="No. of questions">
            <select className="w-full p-2 outline-none" {...register("questions_number")}>
              {Array.from({length:10}, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </InstructorInput>

          <InstructorInput label="Score per question">
            <select className="w-full p-2 outline-none" {...register("score_per_question")}>
              {Array.from({length:10}, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </InstructorInput>
        </div>

        <InstructorInput label="Description:">
          <Textarea className="w-full p-2 outline-none" {...register("description")} />
        </InstructorInput>

        <div className="w-fit">
          <InstructorInput label="schadule">
            <div className="flex items-center gap-2 p-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <span>📅</span>
                <input type="date" className="border rounded px-2 py-1" {...register("date", REQUIRED_VALIDATION("date"))} />
                {errors.date && <p className="text-red-500">{errors.date.message}</p>}
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <span>⏰</span>
                <input type="time" className="border rounded px-2 py-1" {...register("time", REQUIRED_VALIDATION("time"))} />
                {errors.time && <p className="text-red-500">{errors.time.message}</p>}
              </label>
            </div>
          </InstructorInput>
        </div>

        {/* Difficulty / Type / Group */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <InstructorInput label="Difficulty level">
            <select className="w-full p-2 outline-none" {...register("difficulty")}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </InstructorInput>

          <InstructorInput label="Category type">
            <select className="w-full p-2 outline-none" {...register("type")}>
              <option value="FE">FE</option>
              <option value="BE">BE</option>
              <option value="DO">DO</option>
            </select>
          </InstructorInput>

          <InstructorInput label="Group">
            <select className="w-full p-2 outline-none" {...register("group", REQUIRED_VALIDATION("group"))}>
              {errors.group && <p className="text-red-500">{errors.group.message}</p>}
              {allGroups.map((group) => <option key={group._id} value={group._id}>{group.name}</option>)}
            </select>
          </InstructorInput>
        </div>
      </CustomDialog>

      <CodeModal isOpen={showCodeModal} onClose={() => setShowCodeModal(false)} code={codeValue} />
    </>
  );
}