export const baseURL=`https://upskilling-egypt.com:3005`;
export const imgBaseURL='';


export const AUTH_URLS = {
    LOGIN : `/api/auth/login`,
    REGISTER : `/api/auth/register`,
    FORGET_PASSWORD : `/api/auth/forgot-password`,
    RESET_PASSWORD :   `/api/auth/reset-password` ,
    CHANGE_PASSWORD : `/api/auth/change-password`,
    LOGOUT : `/api/auth/logout`,    

}
// Instractor Module
export const STUDENT_URLS = {
  GET_ALL : `/api/student`,
  GET_BY_ID : (id:string) =>`/api/student/${id}`,
  TOP_FIVE_STUDENTS:`/api/student/top-five`,
  GET_STUDENTS_WITHOUT_GROUP:`api/student/without-group`,
  

}
export const GROUPS_URLS = {
  GET_ALL : `/api/group`,
  GET_BY_ID : (id:string) =>`/api/group/${id}`,
  CREATE_GROUP : `/api/group`,
  UPDATE_GROUP : (id:string)=>`/api/group/${id}`,
  DELETE_GROUP : (id:string)=>`/api/group/${id}`,

}
export const QUESTION_URLS = {
  GET_ALL : `/api/question`,
  GET_BY_ID : (id:string) =>`/api/question/${id}`,
  CREATE_QUESTION : `/api/question`,
  UPDATE_QUESTION : (id:string)=>`/api/question/${id}`,
  DELETE_QUESTION : (id:string)=>`/api/question/${id}`,
  SEARCH : `/api/question/search`,
}
export const QUIZ_URLS = {
  GET_ALL : `/api/quiz`,
  GET_BY_ID : (id:string) =>`/api/quiz/${id}`,
  CREATE_QUIZ : `/api/quiz`,
  UPDATE_QUIZ : (id:string)=>`/api/quiz/${id}`,
  DELETE_QUIZ : (id:string)=>`/api/quiz/${id}`,
  SEARCH : `/api/question/search`,
  JOIN: `/api/quiz/join`,
  SUBMIT :(id:string)=>  `/api/quiz/submit/${id}`,
  WITHOUT_ANSWER : (id:string) => `/api/quiz/without-answers/${id}`,
  RESULT : `/api/quiz/result`,
  FIRST_INCOMMING :`/api/quiz/incomming`,
  LAST_COMPLETED : `/api/quiz/completed`,
  REASSIGN : (id:string) => `/api/quiz/reassign/${id}`,
}

// end Instractor module
export const RESULT={
    GET_ALL_RESULT:`/api/quiz/result`

}
