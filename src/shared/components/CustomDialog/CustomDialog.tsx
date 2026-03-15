import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import type { ReactNode } from "react";
import { HiCheck, HiOutlineX } from "react-icons/hi";

interface FormModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
}

export default function CustomDialog({
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  size = "lg",
  isLoading = false,
}: FormModalProps) {
  return (
    <Modal
      show={isOpen}
      size={size}
      onClose={onClose}
      dismissible={false}
      className="bg-gray-500/50 backdrop-blur-sm"   
    >
      <ModalHeader className="flex items-center w-full ">

        <div className="flex  w-screen justify-between ">

          <h3 className="font-semibold text-lg">{title}</h3>

          {/* push buttons to right */}
          <div className="me-20 ">

            <button
              type="submit"
              form="shared-form"
              disabled={isLoading}
              className="p-2 hover:scale-110 transition"
            >
              {isLoading?
              <HiCheck size={20} color="#ccc" />
                  :
              <HiCheck size={20} />
              }
             
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:scale-110 transition"
            >
              <HiOutlineX size={20} />
            </button>

          </div>

        </div>

      </ModalHeader>

      <ModalBody className="bg-white">

        <form id="shared-form" onSubmit={onSubmit} className="space-y-4">
          {children}
        </form>

      </ModalBody>

    </Modal>
  );
}