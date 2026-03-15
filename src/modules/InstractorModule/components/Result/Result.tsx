import  { useEffect, useState } from 'react'


import { axiosInstance } from '../../../../config/httpClient';
import { RESULT } from '../../../../config/api.endPoint';
import "./Result.css"
import {  ClipLoader } from 'react-spinners';
import type { Result } from '../../type';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import NoData from '../../../../shared/components/NoData/NoData';
import CustomPagination from '../../../../shared/components/CustomPagination/CustomPagination';


export default function Result() {
    const [resultList,setResultList]=useState<Result[]>([]);
    const [loading,setLoading]=useState(false);
    const { user } = useSelector((state: RootState) => state.auth);

       /////////////////////////start pagination
    const [currentPage, setCurrentPage] = useState(1);
    const resultPerPage = 10;
    const lastIndex = currentPage * resultPerPage;
    const firstIndex = lastIndex - resultPerPage;

    const currentResult = resultList?.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(resultList.length / resultPerPage);


   /////////////////end pagination
    const getAllResult=async()=>{

        try {
           setLoading(true);
            const response=await axiosInstance.get(RESULT.GET_ALL_RESULT)

            console.log("results", response?.data);
            setResultList(response?.data);
        } catch (error) {
            console.log(error);


        }
        finally {
    setLoading(false);
  }
    }
    useEffect(()=>{
        getAllResult();
    },[])
      if(loading) return <div className=' flex items-center justify-center h-screen '>
   <ClipLoader size={40} color='#288131'  />
   </div>
  return (
    <>

   <div className="bg-white p-6 rounded-xl border border-gray-200 mx-5 my-5 overflow-hidden">
  <h2 className="text-lg font-bold mb-4">Completed Quizzes</h2>


<div className="w-full  overflow-x-auto ">
 {currentResult.length > 0 ?(
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
      
        {currentResult.map((result:Result) => (
          <tr  key={result?.quiz?._id} className="hover:bg-gray-200 my-2">
            <td className="px-4 py-1 border border-gray-300  rounded-tl-lg rounded-bl-lg ">{result.quiz.title}</td>
            <td className="px-4 py-3  border border-gray-300">{result.quiz.group}</td>
               <td className="px-4 py-3  border border-gray-300">{result.quiz.__v}</td>
           {(user && user.role === "Instructor")&& <td className="px-4 py-3  border border-gray-300">{result.participants.length}</td>}
            <td className="px-4 py-3 border border-gray-300">{result.quiz.schadule}</td>
            <td className="px-4 py-3 border border-gray-300  rounded-tr-lg rounded-br-lg ">
              <button className="bg-[#C5D86D]  text-black    px-4 py-1 rounded-full text-sm">
                View
              </button>
            </td>

          </tr>

        ))}
      </tbody>

    </table>
    ):<NoData/>}
  </div>
</div>
 
 <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        />

    </>
  )
}