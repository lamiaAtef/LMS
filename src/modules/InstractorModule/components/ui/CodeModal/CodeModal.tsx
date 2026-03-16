import { Modal } from "flowbite-react";
import InstructorInput from "../../../../../shared/components/ui/InstructorInput/InstructorInput";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCopyOutline, IoCheckmarkDoneSharp } from "react-icons/io5"; // أيقونات أكثر عصرية
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
  size = "md", 
}: FormModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      dismissible={false}
      size={size}
      className="bg-gray-500/50 backdrop-blur-sm"
    >
      <div className="p-8 bg-white rounded-lg">
        {/* أيقونة النجاح مع حركة بسيطة */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <FaRegCheckCircle size={60} className="text-green-500 animate-bounce-short" />
          </div>
        </div>

        <h2 className="text-center font-bold text-2xl text-gray-800 mb-2">
          Quiz Created Successfully!
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Share this code with your students to let them join the quiz.
        </p>

        <div className="max-w-xs mx-auto mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Access Code:
          </label>
          <div className="relative flex items-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-4 transition-all hover:border-green-400">
            <span className="text-2xl font-mono font-bold tracking-widest text-gray-700 flex-1 text-center">
              {code}
            </span>
            
            <button
              onClick={handleCopy}
              className={`p-2 rounded-lg transition-all ${
                copied ? "text-green-600 bg-green-50" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
              title="Copy Code"
            >
              {copied ? (
                <IoCheckmarkDoneSharp size={24} />
              ) : (
                <IoCopyOutline size={24} />
              )}
            </button>
            
            {copied && (
              <span className="absolute -top-8 right-0 text-green-600 text-xs font-bold animate-fade-in">
                Copied to clipboard!
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#C5D86D] hover:bg-[#b4c75d] text-gray-800 font-bold rounded-xl px-12 py-3 transition-colors shadow-md active:scale-95"
          >
            Got it!
          </button>
        </div>
      </div>
    </Modal>
  );
}