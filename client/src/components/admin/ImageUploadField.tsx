import { useState } from "react";

export function ImageUploadField() {
    const [previewUrl, setPreviewUrl] = useState<string | undefined>();

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const localPreview = URL.createObjectURL(file);
        setPreviewUrl(localPreview);
    }

    return (
        <div className="bg-accent1-secondary">
            <p>Image Upload</p>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="bg-accent2-primary "/>
            {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: 600 }} />}
        </div>
    );
}