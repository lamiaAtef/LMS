import axios from 'axios'
import { baseURL } from './api.endPoint'

const axiosInstance=axios.create({
    baseURL:baseURL,
    // timeout:15000,
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const token =localStorage.getItem('token')
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    (error)=>Promise.reject(error)
)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // const refreshToken = localStorage.getItem("refreshToken");
        // i havn't any refresh api 
        // const res = await axios.post("/refresh-token", {
        //   refreshToken,
        // });

        //const newAccessToken = res.data.accessToken;

        //localStorage.setItem("accessToken", newAccessToken);

        //originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
export  {axiosInstance};
