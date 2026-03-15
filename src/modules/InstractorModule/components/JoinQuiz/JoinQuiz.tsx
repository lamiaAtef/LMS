import React from 'react';
import type{ UseFormRegister, FieldErrors } from 'react-hook-form';
import InstructorInput from '../../../../shared/components/ui/InstructorInput/InstructorInput';
import { REQUIRED_VALIDATION } from '../../../../config/validation';

interface JoinQuiz {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const JoinQuiz: React.FC<JoinQuiz> = ({ register, errors }) => {
  return (
    <div className="flex flex-col items-center py-4">
      
      <p className="text-gray-600 mb-8 text-center text-sm sm:text-base px-4">
        Input the code received for the quiz below to join
      </p>

      
      <div className="w-full max-w-sm">
        
          
           <InstructorInput label="Code:">
                    <input className="w-full p-2 outline-none" {...register("code", REQUIRED_VALIDATION("code"))} />
            </InstructorInput>
        </div>

        {errors.code && (
          <p className="text-red-500 text-xs mt-2 ml-2 font-medium">
            {errors.code.message as string}
          </p>
        )}
      </div>
    
  );
};

export default JoinQuiz;