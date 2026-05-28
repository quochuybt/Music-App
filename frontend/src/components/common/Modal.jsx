import { X } from "lucide-react";
import Button from "./Button";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-xl dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <Button variant="ghost" className="h-11 w-11 px-0" onClick={onClose}><X size={22} /></Button>
        </div>
        {children}
      </div>
    </div>
  );
}
