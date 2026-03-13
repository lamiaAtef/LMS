import { FaPlus, FaRegEdit, FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import UpdateQuestionModal from "../QuestionModule/QuestionModule";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../config/httpClient";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { QUESTION_URLS } from "../../../../config/api.endPoint";
import type { Question } from "../../type";



export default function Questions() {
  const[loading,setLoading]=useState(false);
       const [open, setOpen] = useState <boolean>(false);
       const [modalMode, setModalMode] = useState<'create' | 'update' | 'view'>('create');
       const [selectedId, setSelectedId] = useState<string | null>(null);
       const [isViewMode, setIsViewMode] = useState(false);
       console.log("selectedid",selectedId);

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


       const deleteQuestion=async(id:string)=>{
        console.log(id);

       try {
         const response=await axiosInstance.delete(QUESTION_URLS.DELETE_QUESTION(id));
         toast.success(response?.data?.message);
         getAllQuestions();
       } catch (error:any) {

        toast.error(error?.response?.data?.message);

       }

       }
       useEffect(()=>{
        getAllQuestions();
       },[])
         if(loading) return<div className=' flex items-center justify-center h-screen '>
   <BeatLoader size={20} color='#288131'  />
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
        {questions.map((question:Question) => (
          <tr key={question._id} className="hover:bg-gray-200 my-2">
            <td className="px-4 py-1 border border-gray-300  rounded-tl-lg rounded-bl-lg ">{question?.title}</td>
            <td className="px-4 py-3  border border-gray-300">{question.description}</td>
               <td className="px-4 py-3  border border-gray-300">{question?.difficulty}</td>
            <td className="px-4 py-3  border border-gray-300">ppp</td>
            <td className="px-4 py-3 border border-gray-300 flex gap-3 text-[#FB7C19] cursor-pointer">
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
                <FaRegTrashAlt onClick={()=>deleteQuestion(question._id)}  size={23}/>
            </td>



          </tr>



        ))}





      </tbody>

    </table>
  </div>
</div>
    </>
  )
}
