import { useState } from "react";
import { ImageUploadField } from "../../components/admin/ImageUploadField";

export default function TempImageUploadPage() {
  const [value, setValue] = useState<{ url: string; publicId: string } | undefined>();

  return (
    <div className="p-10">
      <label className="flex flex-col gap-2 text-sm text-gray-300">Image Upload</label>
      <ImageUploadField value={value} onChange={setValue} folder="umsa/gallery" />
    </div>
  );
}