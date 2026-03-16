import type { DeleteConfirmModalProps } from "../../../modules/InstractorModule/type";

export default function DeleteConfirmModal({
  isOpen,
  title = "Delete",
  message = "Are you sure you want to delete this item?",
  onConfirm,
  onCancel
}: DeleteConfirmModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

      <div className="bg-white w-[420px] rounded-xl shadow-lg">

        <div className="flex justify-between items-center px-6 py-4 border-b">

          <h3 className="font-semibold text-lg">
            {title}
          </h3>

          <button
            onClick={onCancel}
            className="text-lg font-bold"
          >
            ✕
          </button>

        </div>

        <div className="p-6 text-center text-gray-700">
          {message}
        </div>

        <div className="flex justify-center gap-4 pb-6">

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
           ✓
          </button>

          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
             ✕
          </button>

        </div>

      </div>

    </div>
  );
}