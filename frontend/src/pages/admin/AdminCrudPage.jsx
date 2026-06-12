import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import DataTable from "../../components/admin/DataTable";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import Select from "../../components/common/Select";
import { adminApi } from "../../api/adminApi";
import { API_ORIGIN } from "../../api/axiosClient";

const schema = z.object({ status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE") }).catchall(z.any());

export default function AdminCrudPage({ title, resource, fields, selects = [], imageUploadFields = [] }) {
  const [page, setPage] = useState(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [uploading, setUploading] = useState({});
  const { register, handleSubmit, reset, setValue } = useForm({ resolver: zodResolver(schema), defaultValues: { status: "ACTIVE" } });
  const load = useCallback(() => resource.list({ size: 100 }).then(setPage), [resource]);
  useEffect(() => { load(); }, [load]);
  const uploadImage = async (event, key) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading((state) => ({ ...state, [key]: true }));
    try {
      const uploaded = await adminApi.uploadImage(file);
      setValue(key, resolveUploadUrl(uploaded.url), { shouldDirty: true, shouldValidate: true });
      toast.success("Đã tải ảnh");
    } catch (error) {
      toast.error(error.response?.data?.message || "Không tải được ảnh");
    } finally {
      setUploading((state) => ({ ...state, [key]: false }));
      event.target.value = "";
    }
  };
  const submit = async (values) => {
    const payload = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v === "" ? null : v]));
    editing ? await resource.update(editing.id, payload) : await resource.create(payload);
    toast.success("Đã lưu");
    setOpen(false); setEditing(null); reset({ status: "ACTIVE" }); load();
  };
  const remove = async () => { await resource.remove(deleting.id); toast.success("Đã xóa"); setDeleting(null); load(); };
  const nameKey = fields[0][0];
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4"><div><p className="page-kicker">Quản trị</p><h1 className="mt-2 text-3xl font-extrabold text-white">{title}</h1></div><Button onClick={() => setOpen(true)}>Thêm</Button></div>
      <DataTable loading={!page} rows={page?.content || []} columns={[
        { key: nameKey, header: "Tên" },
        { key: "status", header: "Trạng thái", render: (r) => <Badge tone={r.status === "ACTIVE" ? "green" : "red"}>{r.status}</Badge> },
        { key: "actions", header: "", render: (r) => <div className="flex justify-end gap-2"><Button variant="secondary" className="h-11 w-11 px-0" title="Sửa" onClick={() => { setEditing(r); reset({ ...r, status: r.status || "ACTIVE" }); setOpen(true); }}><Edit size={20} /></Button><Button variant="dangerGhost" className="h-11 w-11 px-0" title="Xóa" onClick={() => setDeleting(r)}><Trash2 size={20} /></Button></div> },
      ]} />
      <Modal open={open} title={editing ? "Sửa" : "Thêm"} onClose={() => { setOpen(false); setEditing(null); reset({ status: "ACTIVE" }); }}>
        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
          {fields.map(([key, label]) => (
            <div key={key} className="space-y-2">
              <Input label={label} {...register(key)} />
              {imageUploadFields.includes(key) && (
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-200">Tải ảnh từ máy</span>
                  <input className="block w-full text-sm text-slate-400 file:mr-3 file:h-10 file:rounded-xl file:border-0 file:bg-emerald-400 file:px-4 file:font-semibold file:text-slate-950" type="file" accept="image/*" onChange={(event) => uploadImage(event, key)} disabled={uploading[key]} />
                </label>
              )}
            </div>
          ))}
          {selects.map(([key, label, options, textKey]) => <Select key={key} label={label} {...register(key)}><option value="">Không chọn</option>{options.map((o) => <option key={o.id} value={o.id}>{o[textKey]}</option>)}</Select>)}
          <Select label="Trạng thái" {...register("status")}><option value="ACTIVE">ACTIVE</option><option value="INACTIVE">INACTIVE</option></Select>
          <Button>Lưu</Button>
        </form>
      </Modal>
      <ConfirmDialog open={Boolean(deleting)} message="Bạn chắc chắn muốn xóa?" onCancel={() => setDeleting(null)} onConfirm={remove} />
    </div>
  );
}

function resolveUploadUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}
