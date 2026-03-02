// login interfaces

export interface LoginPayload{
    email:string;
    password:string;

}
export interface ForgetPayload{
    email:string;
  
    

}
export interface ResetPayload{
    email:string;
      otp:string;
    password:string;
    confirmPassword:string
    

}
    // success login case interface 
export interface SuccessLoginResponse {
  message: string;
  data: AuthData;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  profile: UserProfile;
}

export interface UserProfile {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: "active" | "inactive"; 
  role: "Instructor" | "Student";
}
    // error login case interface 

export interface FailedLoginResponse{
     message: string;
     timestamp: string;
}
// end login interfaces