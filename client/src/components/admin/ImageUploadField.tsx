import { useState } from "react";
import { useImageUpload } from "../../hooks/useImageUpload";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type ImageValue = { url: string; publicId: string };

type Props = {
  value?: ImageValue;
  onChange: (value: ImageValue) => void;
  folder: string;
};

export function ImageUploadField({ value, onChange, folder }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value?.url);
  const [validationError, setValidationError] = useState<string | undefined>();
  const upload = useImageUpload(folder);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_BYTES) {
      setValidationError("File is too large (max 5 MB)");
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setValidationError("Only JPEG, PNG or WebP images are allowed");
      return;
    }
    setValidationError(undefined);

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    upload.mutate(file, {
      onSuccess: (result) => {
        URL.revokeObjectURL(localPreview);
        setPreviewUrl(result.url);
        onChange(result);
      },
    });
  }

  return (
    <div className="bg-accent1-secondary flex flex-col items-center gap-3 p-4 rounded-lg max-w-[600px] mx-auto">
      <p>Image Upload</p>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={upload.isPending}
        className="bg-accent2-primary max-w-full"
      />

      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="w-full max-w-[600px] h-auto rounded" />
      )}

      {upload.isPending && <p>Uploading…</p>}
      {validationError && <p className="text-red-600 text-sm text-center">{validationError}</p>}
      {upload.isError && (
        <p className="text-red-600 text-sm text-center">Upload failed. Please try again.</p>
      )}

      {value && (
        <div className="w-full text-xs text-black break-all text-center">
          <p className="w-full min-w-0 truncate">{value.url}</p>
          <p className="w-full min-w-0 truncate">{value.publicId}</p>
        </div>
      )}
    </div>
  );
}