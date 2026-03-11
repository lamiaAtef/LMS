import  { useEffect, useState } from 'react'


import { axiosInstance } from '../../../../config/httpClient';
import { RESULT } from '../../../../config/api.endPoint';
import Pagination from '../../../../shared/components/Pagination/Pagination';
import "./Result.css"
interface ResultResponse{
  title:string,
  _id:string
}

export default function Result() {
    const [resultList,setResultList]=useState<ResultResponse[]>([]);
       /////////////////////////start pagination
   const [currentPage, setCurrentPage] = useState(1);
   const resultPerPage = 6;
     const indexOfLastResult= currentPage * resultPerPage;
   const indexOfFirstResult = indexOfLastResult - resultPerPage;
   const currentResult = resultList?.slice(indexOfFirstResult, indexOfLastResult);

   const handlePagination = (pageNumber:any) => setCurrentPage(pageNumber);
   /////////////////end pagination
    const getAllResult=async()=>{
        try {
            const response=await axiosInstance.get(RESULT.GET_ALL_RESULT)

console.log("results", response?.data);
setResultList(response?.data);
        } catch (error) {
            console.log(error);


        }
    }
    useEffect(()=>{
        getAllResult();
    },[])
  return (
    <>

   <div className="bg-white p-6 rounded-xl border border-gray-200 mx-5 my-5 overflow-hidden">
  <h2 className="text-lg font-bold mb-4">Completed Quizzes</h2>


<div className="w-full  overflow-x-auto ">
<table className="min-w-[800px] text-left border-separate border-spacing-y-2 w-full">

      <thead className="bg-gray-900 text-white  text-sm font-thin">
        <tr>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Group name</th>
          <th className="px-4 py-3">No. of persons in group</th>
          <th className="px-4 py-3">Participants</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3"></th>
        </tr>

      </thead>

      <tbody className="divide-y">
        {currentResult.length > 0 ?(
        currentResult.map((result:ResultResponse) => (
          <tr  key={result?._id} className="hover:bg-gray-200 my-2">
            <td className="px-4 py-1 border border-gray-300  rounded-tl-lg rounded-bl-lg ">{result.quiz.title}</td>
            <td className="px-4 py-3  border border-gray-300">{result.quiz.group}</td>
               <td className="px-4 py-3  border border-gray-300">lll</td>
            <td className="px-4 py-3  border border-gray-300">{result.participants.length}</td>
            <td className="px-4 py-3 border border-gray-300">{result.quiz.schadule}</td>
            <td className="px-4 py-3 border border-gray-300  rounded-tr-lg rounded-br-lg ">
              <button className="bg-[#C5D86D]  text-black    px-4 py-1 rounded-full text-sm">
                View
              </button>
            </td>

          </tr>








        ))):""}
      </tbody>

    </table>
  </div>
</div>
   <Pagination
          categoryPerPage={resultPerPage}
          length={resultList.length}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />
    </>
  )
}