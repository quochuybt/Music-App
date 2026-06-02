import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { adminApi } from "../../api/adminApi";
import { API_ORIGIN } from "../../api/axiosClient";
import { albumApi } from "../../api/albumApi";
import { artistApi } from "../../api/artistApi";
import { genreApi } from "../../api/genreApi";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import { songSchema } from "../../utils/validators";

export default function SongFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [refs, setRefs] = useState({ artists: [], albums: [], genres: [] });
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ resolver: zodResolver(songSchema), defaultValues: { status: "ACTIVE" } });
  const [uploading, setUploading] = useState({ image: false, audio: false });
  const [calculatingDuration, setCalculatingDuration] = useState(false);
  useEffect(() => {
    Promise.all([artistApi.list({ size: 100 }), albumApi.list({ size: 100 }), genreApi.list({ size: 100 })]).then(([artists, albums, genres]) => setRefs({ artists: artists.content || [], albums: albums.content || [], genres: genres.content || [] }));
    if (id) adminApi.songs.get(id).then((song) => reset({ ...song, artistId: song.artistId, albumId: song.albumId || "", genreId: song.genreId }));
  }, [id, reset]);
  const submit = async (values) => {
    const payload = { ...values, albumId: values.albumId || null };
    id ? await adminApi.songs.update(id, payload) : await adminApi.songs.create(payload);
    toast.success("Đã lưu bài hát");
    navigate("/admin/songs");
  };
  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading((state) => ({ ...state, image: true }));
    try {
      const uploaded = await adminApi.uploadImage(file);
      setValue("imageUrl", resolveUploadUrl(uploaded.url), { shouldDirty: true, shouldValidate: true });
      toast.success("Đã tải ảnh bìa");
    } catch (error) {
      toast.error(error.response?.data?.message || "Không tải được ảnh");
    } finally {
      setUploading((state) => ({ ...state, image: false }));
    }
  };
  const uploadAudio = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading((state) => ({ ...state, audio: true }));
    setCalculatingDuration(true);
    try {
      const [uploaded, duration] = await Promise.all([adminApi.uploadAudio(file), readAudioDuration(file)]);
      setValue("audioUrl", resolveUploadUrl(uploaded.url), { shouldDirty: true, shouldValidate: true });
      setValue("duration", duration, { shouldDirty: true, shouldValidate: true });
      toast.success("Đã tải file nhạc");
    } catch (error) {
      toast.error(error.response?.data?.message || "Không tải được file nhạc");
    } finally {
      setUploading((state) => ({ ...state, audio: false }));
      setCalculatingDuration(false);
    }
  };
  const syncDurationFromUrl = async (event) => {
    const url = event.target.value?.trim();
    if (!url) return;
    setCalculatingDuration(true);
    try {
      const duration = await readAudioDuration(url);
      setValue("duration", duration, { shouldDirty: true, shouldValidate: true });
    } catch {
      toast.error("Không đọc được thời lượng từ Audio URL");
    } finally {
      setCalculatingDuration(false);
    }
  };
  const audioUrlField = register("audioUrl");
  return <AdminForm title={id ? "Sửa bài hát" : "Thêm bài hát"} onSubmit={handleSubmit(submit)}>
    <Input label="Tên bài hát" {...register("title")} error={errors.title?.message} />
    <Select label="Ca sĩ" {...register("artistId")} error={errors.artistId?.message}><option value="">Chọn ca sĩ</option>{refs.artists.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}</Select>
    <Select label="Album" {...register("albumId")}><option value="">Không có album</option>{refs.albums.map((i) => <option key={i.id} value={i.id}>{i.title}</option>)}</Select>
    <Select label="Thể loại" {...register("genreId")} error={errors.genreId?.message}><option value="">Chọn thể loại</option>{refs.genres.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}</Select>
    <div className="space-y-2">
      <Input label="Image URL" {...register("imageUrl")} error={errors.imageUrl?.message} />
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-200">Tải ảnh bìa</span>
        <input className="block w-full text-sm text-slate-400 file:mr-3 file:h-10 file:rounded-xl file:border-0 file:bg-emerald-400 file:px-4 file:font-semibold file:text-slate-950" type="file" accept="image/*" onChange={uploadImage} disabled={uploading.image} />
      </label>
    </div>
    <div className="space-y-2">
      <Input label="Audio URL" {...audioUrlField} onBlur={(event) => { audioUrlField.onBlur(event); syncDurationFromUrl(event); }} />
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-200">Tải file nhạc</span>
        <input className="block w-full text-sm text-slate-400 file:mr-3 file:h-10 file:rounded-xl file:border-0 file:bg-emerald-400 file:px-4 file:font-semibold file:text-slate-950" type="file" accept="audio/*,.m4a" onChange={uploadAudio} disabled={uploading.audio} />
        <span className="mt-1 block text-xs text-slate-400">Thời lượng sẽ tự tính sau khi chọn file audio.</span>
      </label>
    </div>
    <Input label="Thời lượng" placeholder={calculatingDuration ? "Đang tính..." : "Tự tính từ audio"} {...register("duration")} error={errors.duration?.message} readOnly className="cursor-not-allowed bg-white/[0.035]" />
    <Input label="Mô tả" {...register("description")} />
    <Select label="Trạng thái" {...register("status")}><option value="ACTIVE">ACTIVE</option><option value="INACTIVE">INACTIVE</option></Select>
  </AdminForm>;
}

export function AdminForm({ title, onSubmit, children }) {
  return <form onSubmit={onSubmit} className="app-surface max-w-3xl space-y-4 rounded-2xl p-5"><h1 className="text-2xl font-bold text-white">{title}</h1><div className="grid gap-4 md:grid-cols-2">{children}</div><Button>Lưu</Button></form>;
}

function resolveUploadUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}

function readAudioDuration(source) {
  return new Promise((resolve, reject) => {
    const audio = document.createElement("audio");
    const isFile = source instanceof File;
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      if (isFile) URL.revokeObjectURL(audio.src);
      if (!Number.isFinite(audio.duration)) return reject(new Error("Invalid audio duration"));
      resolve(formatAudioDuration(audio.duration));
    };
    audio.onerror = () => {
      if (isFile) URL.revokeObjectURL(audio.src);
      reject(new Error("Unable to read audio duration"));
    };
    audio.src = isFile ? URL.createObjectURL(source) : source;
  });
}

function formatAudioDuration(duration) {
  const totalSeconds = Math.round(duration);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return hours ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds}` : `${minutes}:${seconds}`;
}
