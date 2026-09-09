//remove the whole file later
import { ImageUploadField } from "../../components/admin/ImageUploadField";

export default function TempImageUploadPage() {
    return (
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold mb-2">Image Upload</h1>
          <p className="text-sm text-gray-400 mb-6">
            temp image upload page to render Image Upload Field
          </p>

          <ImageUploadField/>
        </div>
    );
}
