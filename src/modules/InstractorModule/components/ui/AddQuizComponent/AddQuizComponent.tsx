import InstructorInput from '../../../../../shared/components/ui/InstructorInput/InstructorInput'
import type {  Group } from '../../../type';
import { Textarea } from 'flowbite-react';
import { REQUIRED_VALIDATION } from '../../../../../config/validation';


 type AddQuizProps = {
  register: any;
  errors: any;
  allGroups: Group[];
};
export default function AddQuizComponent({ register, errors, allGroups }: AddQuizProps) {

  
    
  return (
    <>
        {/* Quiz Form */}
        <h2>Details</h2>
        <InstructorInput label="Title:">
          <input className="w-full p-2 outline-none" {...register("title", REQUIRED_VALIDATION("title"))} />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </InstructorInput>

        {/* Duration / Questions / Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <InstructorInput label="Duration (in minutes)">
            <select className="w-full p-2 outline-none" {...register("duration", REQUIRED_VALIDATION("duration"))}>
              {[1,5,10,15,20,30,45,60,180].map((min) => <option key={min} value={min}>{min} min</option>)}
            </select>
          </InstructorInput>

          <InstructorInput label="No. of questions">
            <select className="w-full p-2 outline-none" {...register("questions_number")}>
              {Array.from({length:10}, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </InstructorInput>

          <InstructorInput label="Score per question">
            <select className="w-full p-2 outline-none" {...register("score_per_question")}>
              {Array.from({length:10}, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </InstructorInput>
        </div>

        <InstructorInput label="Description:">
          <Textarea className="w-full p-2 outline-none" {...register("description")} />
        </InstructorInput>

        <div className="w-fit">
          <InstructorInput label="schadule">
            <div className="flex items-center gap-2 p-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <span>📅</span>
                <input type="date" className="border rounded px-2 py-1" {...register("date", REQUIRED_VALIDATION("date"))} />
                {errors.date && <p className="text-red-500">{errors.date.message}</p>}
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <span>⏰</span>
                <input type="time" className="border rounded px-2 py-1" {...register("time", REQUIRED_VALIDATION("time"))} />
                {errors.time && <p className="text-red-500">{errors.time.message}</p>}
              </label>
            </div>
          </InstructorInput>
        </div>

        {/* Difficulty / Type / Group */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <InstructorInput label="Difficulty level">
            <select className="w-full p-2 outline-none" {...register("difficulty")}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </InstructorInput>

          <InstructorInput label="Category type">
            <select className="w-full p-2 outline-none" {...register("type")}>
              <option value="FE">FE</option>
              <option value="BE">BE</option>
              <option value="DO">DO</option>
            </select>
          </InstructorInput>

          <InstructorInput label="Group">
            <select className="w-full p-2 outline-none" {...register("group", REQUIRED_VALIDATION("group"))}>
              {errors.group && <p className="text-red-500">{errors.group.message}</p>}
              {allGroups.map((group) => <option key={group._id} value={group._id}>{group.name}</option>)}
            </select>
          </InstructorInput>
        </div>
    </>
  )
}
