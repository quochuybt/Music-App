import { X } from "lucide-react";
import Button from "./Button";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-xl">
      <div className="modal-panel app-surface w-full max-w-lg rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <Button variant="ghost" className="h-11 w-11 px-0" onClick={onClose}><X size={22} /></Button>
        </div>
        {children}
      </div>
    </div>
  );
}
