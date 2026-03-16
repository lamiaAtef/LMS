import { FaPlus, FaRegEdit, FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import UpdateQuestionModal from "../QuestionModule/QuestionModule";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../config/httpClient";
import { toast } from "react-toastify";
import { BeatLoader, ClipLoader } from "react-spinners";
import { QUESTION_URLS } from "../../../../config/api.endPoint";
import type { Question } from "../../type";
import CustomPagination from "../../../../shared/components/CustomPagination/CustomPagination";
import DeleteConfirmModal from "../../../../shared/components/DeleteConfirm/DeleteConfirm";



export default function Questions() {
  const[loading,setLoading]=useState(false);
       const [open, setOpen] = useState <boolean>(false);
       const [modalMode, setModalMode] = useState<'create' | 'update' | 'view'>('create');
       const [selectedId, setSelectedId] = useState<string | null>(null);
       const [isViewMode, setIsViewMode] = useState(false);
       console.log("selectedid",selectedId);
      const [openModal, setOpenModal] = useState(false);
       const [questions,setQuestions]=useState<Question[]>([]);
       const getAllQuestions=async()=>{
        setLoading(true);
       try {

         const response=await axiosInstance.get(QUESTION_URLS.GET_ALL);
        console.log("all questions",response?.data);
          const reversed = response.data.reverse();
        setQuestions(reversed )

       } catch (error:any) {
        toast.error(error.response.data.message)
       }

 finally{
        setLoading(false);
       }

        }
        //pagination 
      const [currentPage, setCurrentPage] = useState(1);
      const studentsPerPage = 10;

      const lastIndex = currentPage * studentsPerPage;
      const firstIndex = lastIndex - studentsPerPage;
      const currentQuestion = questions.slice(firstIndex, lastIndex);
      const totalPages = Math.ceil(questions.length / studentsPerPage);



       const deleteQuestion=async(id:string)=>{
        console.log(id);

       try {
         const response=await axiosInstance.delete(QUESTION_URLS.DELETE_QUESTION(id));
         toast.success(response?.data?.message);
         getAllQuestions();
         setOpenModal(false);   
        setSelectedId(null);
       } catch (error:any) {

        toast.error(error?.response?.data?.message);

       }

       }
       useEffect(()=>{
        getAllQuestions();
       },[])
         if(loading) return<div className=' flex items-center justify-center h-screen '>
         <ClipLoader size={40} color='#288131'  />
          </div>

  return (
    <>
    <UpdateQuestionModal open={open} onClose={()=>setOpen(false)}
    onSuccess={getAllQuestions}
    selectedId={selectedId}
     isViewMode={isViewMode}
     titleMode={modalMode}
     />
    <div className="bg-white p-6 rounded-xl border border-gray-200  mx-5 my-5">
 <div className="flex justify-between">
     <h2 className="text-lg font-bold mb-4">Bank Of Questions</h2>
        <button className="flex  items-center text-black px-4 py-2 rounded-2xl   border border-gray-300 cursor-pointer"
        onClick={()=>{
          setOpen(true);
            setModalMode("create");

        }}>
       <FaPlus className="mr-2 bg-black text-white p-2 rounded-full"  size={30}/>
      Add Question
     </button>
 </div>

  <div className="overflow-x-auto">
    <table className="w-full text-left border-separate border-spacing-y-2 " >

      <thead className="bg-gray-900 text-white  text-sm font-thin">
        <tr>
          <th className="px-4 py-3">Question Title</th>
          <th className="px-4 py-3">Question  Desc</th>
          <th className="px-4 py-3">Question difficulty level</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Actions</th>

        </tr>

      </thead>

      <tbody className="divide-y">
        {currentQuestion.map((question:Question) => (
          <tr key={question._id} className="hover:bg-gray-200 my-2">
            <td className="px-4 py-1 border border-gray-300  rounded-tl-lg rounded-bl-lg ">{question?.title}</td>
            <td className="px-4 py-3  border border-gray-300">{question.description}</td>
               <td className="px-4 py-3  border border-gray-300">{question?.difficulty}</td>
            <td className="px-4 py-3  border border-gray-300">ppp</td>
           <td className="px-4 py-3 border border-gray-300  text-[#FB7C19] cursor-pointer">
               <div className="flex items-center gap-3">
                <FaRegEye  size={23} onClick={()=>{
                   setSelectedId(question._id); // نحفظ السؤال الحالي
  setIsViewMode(true);
    setModalMode("view");        // نحدد إنه عرض فقط
  setOpen(true);

                }}/>
                <FaRegEdit   size={23} onClick={()=>{
                   setSelectedId(question._id);
                     setIsViewMode(false);
                       setModalMode("update");
                   setOpen(true)


                }
                }/>
                 <FaRegTrashAlt  onClick={() => {
                  setSelectedId(question._id);
                  setOpenModal(true);
                }} size={23}/>
                  </div>
            </td>
      


          </tr>



        ))}





      </tbody>

    </table>
     <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
     />
       <DeleteConfirmModal
             isOpen={openModal}
             title="Delete Question"
             message="Are you sure you want to delete this Question?"
             onConfirm={() => selectedId && deleteQuestion(selectedId)}
             onCancel={() => setOpenModal(false)}
           />
         
    </div>
    </div>
    </>
  )
}
