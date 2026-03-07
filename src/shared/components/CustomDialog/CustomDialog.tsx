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
  size = "md",
  isLoading = false,
}: FormModalProps) {
  return (
    <Modal  show={isOpen} size={size} onClose={onClose} dismissible={false} className="bg-[#00000080]">

      {/* HEADER */}
      <div id="header" className="bg-[#fff] flex flex-row justify-between p-5 ">

          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <div className="flex items-center">

            {/* SUBMIT */}
            <button
              type="submit"
              form="shared-form"
              disabled={isLoading}
              className="px-4 border-l-2 border-[#ccc] flex items-center justify-center "
            >
              <HiCheck size={30} />
            </button>

            {/* CANCEL */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 border-l-2  border-[#ccc] flex items-center justify-center "
            >
              <HiOutlineX size={30}  />
            </button>

          </div>
      </div>

      {/* BODY */}
      <ModalBody className="p-5">

        <form
          id="shared-form"
          onSubmit={onSubmit}
          className="space-y-4"
        >
          {children}
        </form>

      </ModalBody>

    </Modal>
  );
}