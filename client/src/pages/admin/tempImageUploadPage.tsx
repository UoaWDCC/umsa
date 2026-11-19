import { useState } from "react";
import ImageUploadField from "../../components/admin/ImageUploadField";

export default function TempImageUploadPage() {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div className="p-10">
      <h1 className="mb-4 text-lg text-accent1-primary">Image Upload</h1>
      <ImageUploadField value={value} onChange={setValue} onBusy={setBusy} folder="umsa/gallery" />
      {busy && <p role="status" className="mt-2 text-sm">Uploading image…</p>}
    </div>
  );
}
