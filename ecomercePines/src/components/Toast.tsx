"use client";

import { CheckCircle, XCircle } from "lucide-react";

export default function Toast({
  message,
  type = "success",
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div className="fixed top-5 right-5 z-[9999]">
      <div
        className={`
          flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg
          ${type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
        `}
      >
        {type === "success" ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <XCircle className="w-5 h-5" />
        )}
        <span className="text-sm">{message}</span>
        <button onClick={onClose} className="text-sm font-bold ml-2">
          ×
        </button>
      </div>
    </div>
  );
}
