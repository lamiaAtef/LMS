import { useEffect, useState } from "react"
import { axiosInstance } from "../../../config/httpClient"
import { GROUPS_URLS } from "../../../config/api.endPoint"

export const useGetAllGroups = () => {

 const [allGroups,setAllGroups] = useState([])

 useEffect(()=>{

   const fetchGroups = async ()=>{

      const res = await axiosInstance.get(GROUPS_URLS.GET_ALL)
      setAllGroups(res.data)

   }

   fetchGroups()

 },[])

 return allGroups
}