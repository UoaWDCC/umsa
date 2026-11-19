import { useImageUpload } from "../../hooks/useImageUpload";
import { apiErrorMessage } from "../../lib/api";
import { useState } from "react";

type Props = { value: string; folder: string; onChange: (url: string) => void; onBusy: (busy: boolean) => void };
export default function ImageUploadField({ value, folder, onChange, onBusy }: Props) {
  const upload = useImageUpload(folder);
  const [error, setError] = useState("");
  const choose = async (file?: File) => {
    if (!file) return;
    setError("");
    if (file.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Choose a JPEG, PNG or WebP image under 5 MB.");
      return;
    }
    onBusy(true);
    try { onChange((await upload.mutateAsync(file)).url); }
    catch (err) { setError(apiErrorMessage(err)); }
    finally { onBusy(false); }
  };
  return <div className="space-y-2">
    <input type="url" aria-label="Image URL" value={value} onChange={e => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-150 px-3 py-2 text-sm" placeholder="https://…" />
    <input type="file" aria-label="Upload image" accept="image/jpeg,image/png,image/webp" disabled={upload.isPending}
      onChange={e => void choose(e.target.files?.[0])} className="max-w-full text-sm" />
    {value && <img src={value} alt="Selected image" className="h-24 w-24 rounded-lg object-cover" />}
    {upload.isPending && <p className="text-sm">Uploading…</p>}
    {error && <p role="alert" className="text-sm text-accent2-primary">{error}</p>}
  </div>;
}
