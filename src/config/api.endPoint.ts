

export const baseURL=`https://upskilling-egypt.com:3005`;
export const imgBaseURL='';


export const AUTH_URLS = {
    LOGIN : `/api/auth/login`,
    REGISTER : `/api/auth/register`,
    FORGET_PASSWORD : `/api/auth/forgot-password`,
    RESET_PASSWORD :   `/api/auth/reset-password` ,
    CHANGE_PASSWORD : `/api/auth/change-password`,

}
export const STUDENT={
    GET_ALL_STUDENT:`/api/student`,
}
export const RESULT={
    GET_ALL_RESULT:`/api/quiz/result`

}
export const QUESTIONS={
    CRETE_QUESTIONS:`/api/question`,
    GET_ALL_QUES:`/api/question`,
    DELETE_QUESTION:(id:string)=> `/api/question/${id}`,
    GET_QUESTION_BY_ID:(id:string)=>`/api/question/${id}`,
     UPDATE_QUESTION:(id:string)=>`/api/question/${id}`
}
