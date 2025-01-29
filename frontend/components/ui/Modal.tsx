// components/ui/Modal.tsx

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b bg-indigo-50">
          <h2 className="text-xl font-semibold text-indigo-700">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          <div className="overflow-y-auto max-h-80">{children}</div>
        </div>

        {/* Modal Footer */}
        {footer && <div className="p-4 border-t">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
