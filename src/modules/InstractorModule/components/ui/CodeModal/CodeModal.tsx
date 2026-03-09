import { Modal } from "flowbite-react";
import InstructorInput from "../../../../../shared/components/ui/InstructorInput/InstructorInput";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { useState } from "react";


interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function CodeModal({
  isOpen,
  onClose,
  code,
  size = "sm",
 
}:FormModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
     setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
    
  };
  return (
    <Modal
        show={isOpen}
        onClose={onClose}
        dismissible={false}
        className="bg-gray-500/50 backdrop-blur-sm [&>div]:w-auto [&>div]:max-w-auto "
      >
     
        <div id="default-modal"  aria-hidden="true" className="p-5">
          <div className='flex justify-center'>
              <FaRegCheckCircle size={100} />

          </div>
          <h2 className='text-center font-bold text-2xl'>Quiz was successfully created</h2>
           <div className="w-fit m-auto my-5">
                <InstructorInput label="Code:">
                              <p
                                className="w-fit px-5 py-1  inline-block"
                                
                                id="code"
                              >
                                {code}
                                </p>
                              <button className="py-1 cursor-pointer " title="copy" onClick={handleCopy}><IoCopy fontSize={30} /></button>
                               
                </InstructorInput>
                                {copied && <span className="text-green-600 text-sm">Copied ✓</span>}
            </div>
          <button  type="button" onClick={onClose} className='bg-[#C5D86D]  rounded-full px-10 py-3 w-48 block mx-auto'>Close</button>
           
         </div>

    </Modal>
  );
}