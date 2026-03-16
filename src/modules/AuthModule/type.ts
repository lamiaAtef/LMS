//  GENERAL INTERFACE  ==> FailedResponse
export interface FailedResponse{
     message: string;
     timestamp: string;
}
export interface UserProfile {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: "active" | "inactive"; 
  role: "Instructor" | "Student";
}
// login interfaces

//  GENERAL INTERFACE  ==> FailedResponse

//login interfaces

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


  // error login case interface  IN FailedResponse

// end login interfaces

// start Change_Passsword  interfaces
export interface ChangePasswordPayload{
    password:string;
    password_new:string;
    confirm:string;

}
export interface SuccessChangePassword{
  message:string;
  data:UserProfile;
}
// end Change_Passsword  interfaces ==> FailedResponse USED IN CHANGEpASSWORD FAILURE RESPONSE

// start register 
type Role="Instructor" | "Student";

export interface RegisterPayload{
  first_name:string,
  last_name:string,
  password:string,
  email:string,
  role:Role,
}

// end register
