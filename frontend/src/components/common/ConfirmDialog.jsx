import Button from "./Button";
import Modal from "./Modal";

export default function ConfirmDialog({ open, title = "Xác nhận", message, confirmLabel = "Xóa", confirmVariant = "danger", onCancel, onConfirm }) {
  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <p className="text-sm text-slate-300">{message}</p>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>Hủy</Button>
        <Button variant={confirmVariant} onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}
