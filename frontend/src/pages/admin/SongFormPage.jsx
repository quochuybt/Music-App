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
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(songSchema), defaultValues: { status: "ACTIVE" } });
  const [uploading, setUploading] = useState({ image: false, audio: false });
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
      reset((values) => ({ ...values, imageUrl: `${API_ORIGIN}${uploaded.url}` }));
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
    try {
      const [uploaded, duration] = await Promise.all([adminApi.uploadAudio(file), readAudioDuration(file)]);
      reset((values) => ({ ...values, audioUrl: `${API_ORIGIN}${uploaded.url}`, duration }));
      toast.success("Đã tải file nhạc");
    } catch (error) {
      toast.error(error.response?.data?.message || "Không tải được file nhạc");
    } finally {
      setUploading((state) => ({ ...state, audio: false }));
    }
  };
  return <AdminForm title={id ? "Sửa bài hát" : "Thêm bài hát"} onSubmit={handleSubmit(submit)}>
    <Input label="Tên bài hát" {...register("title")} error={errors.title?.message} />
    <Select label="Ca sĩ" {...register("artistId")} error={errors.artistId?.message}><option value="">Chọn ca sĩ</option>{refs.artists.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}</Select>
    <Select label="Album" {...register("albumId")}><option value="">Không có album</option>{refs.albums.map((i) => <option key={i.id} value={i.id}>{i.title}</option>)}</Select>
    <Select label="Thể loại" {...register("genreId")} error={errors.genreId?.message}><option value="">Chọn thể loại</option>{refs.genres.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}</Select>
    <div className="space-y-2">
      <Input label="Image URL" {...register("imageUrl")} error={errors.imageUrl?.message} />
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Tải ảnh bìa</span>
        <input className="block w-full text-sm file:mr-3 file:h-10 file:rounded-md file:border-0 file:bg-violet-600 file:px-4 file:font-semibold file:text-white" type="file" accept="image/*" onChange={uploadImage} disabled={uploading.image} />
      </label>
    </div>
    <div className="space-y-2">
      <Input label="Audio URL" {...register("audioUrl")} />
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Tải file nhạc</span>
        <input className="block w-full text-sm file:mr-3 file:h-10 file:rounded-md file:border-0 file:bg-cyan-500 file:px-4 file:font-semibold file:text-white" type="file" accept="audio/*,.m4a" onChange={uploadAudio} disabled={uploading.audio} />
      </label>
    </div>
    <Input label="Thời lượng" placeholder="04:12" {...register("duration")} error={errors.duration?.message} />
    <Input label="Mô tả" {...register("description")} />
    <Select label="Trạng thái" {...register("status")}><option value="ACTIVE">ACTIVE</option><option value="INACTIVE">INACTIVE</option></Select>
  </AdminForm>;
}

export function AdminForm({ title, onSubmit, children }) {
  return <form onSubmit={onSubmit} className="max-w-3xl space-y-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h1 className="text-2xl font-bold">{title}</h1><div className="grid gap-4 md:grid-cols-2">{children}</div><Button>Lưu</Button></form>;
}

function readAudioDuration(file) {
  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(audio.src);
      if (!Number.isFinite(audio.duration)) return resolve("");
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.round(audio.duration % 60).toString().padStart(2, "0");
      resolve(`${minutes}:${seconds}`);
    };
    audio.onerror = () => resolve("");
    audio.src = URL.createObjectURL(file);
  });
}
