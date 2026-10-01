import { useState } from "react";
import { ImageUploadField } from "../../components/admin/ImageUploadField";

export default function TempImageUploadPage() {
  const [value, setValue] = useState<{ url: string; publicId: string } | undefined>();

  return (
    <div className="p-10">
      <h1>Test Upload</h1>
      <ImageUploadField value={value} onChange={setValue} folder="umsa/gallery" />
    </div>
  );
}