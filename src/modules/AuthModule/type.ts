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
export interface LoginPayload{
    email:string;
    password:string;

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