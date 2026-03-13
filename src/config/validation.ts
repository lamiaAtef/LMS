
export const getRequiredMessage = (fieldName:string):string => `${fieldName} is required`
export const EMAIL_VALIDATION ={

    required: getRequiredMessage("Email"),
    pattern:{
    value:/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    message : "email must be a valid email"
    }
}
export const PASSWORD_VALIDATION={

    required:getRequiredMessage("Password"),
    minLength: {
    value: 3,
    message: "password must be at least 3 characters long."
    },
    // pattern:{
    //     value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //     message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."

    // }
}
export const NAME_VALIDATION= {
    required:getRequiredMessage("name"),
    // minLength: {
    // value: 4,
    // message: "User name must be at least 4 characters"
    // },
    // maxLength: {
    //     value: 8,
    //     message: "User name must not exceed 8 characters"
    // },
 
}
// export const PHONE_VALIDATION={
//      required:getRequiredMessage("phone"),
    
//      pattern:{
//         value:/^01[0-9]{9}$/,
//         message:"Phone number must start with 01 and be 11 digits in total"
//      }
// }
export const CONFIRM_PASSWORD_VALIDATION = (password: string) => ({
  required: getRequiredMessage("Confirm Password"),
  validate: (value: string) =>
    value === password || "Passwords do not match",
});
export const OTP_VALIDATION = {
     required: getRequiredMessage("OTP"),
       pattern:{
        value:/^\d{6}$/,
        message : "Invalid OTP"
    }
}
export const ROLE_VALIDATION = {
     required: getRequiredMessage("Role"),
   
}
    


export const REQUIRED_VALIDATION = (fieldName:string) => ({ required: getRequiredMessage(fieldName) })