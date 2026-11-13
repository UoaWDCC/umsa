import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import axios from "axios";
import { isAxiosError } from "axios";
import { ME_KEY } from "./useAuth";

export const useImageUpload = (folder: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const { data: sig } = await api.post("/admin/uploads/signature", { folder });
      const form = new FormData();
      form.append("file", file);
      form.append("api_key", sig.apiKey);
      form.append("timestamp", sig.timestamp);
      form.append("signature", sig.signature);
      form.append("folder", sig.folder);
      // ^send a request with post method + /admin/uploads/signature path 
      //  include the folder from when useImageUpload was called with folder in param
      //  wait for express to respond with apiKey, timestamp, signature and folder
      //  new formData object and we append file, apiKey, timestamp, signature and folder

      const res = await axios.post(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, form);
      return { url: res.data.secure_url, publicId: res.data.public_id };
      // ^send request with post method to cloudinary w/ our cloudname we got from backend + all the formdata
      //  wait for cloudinary to send back response
      //  return res.data.secure_url and res.data.public_id as url and publicId
   },
   onError: (err) => {
      if (isAxiosError(err) && err.response?.status === 401) {
        // session died mid-edit -> nulls auth cache and AdminLayout redirects
        queryClient.setQueryData(ME_KEY, null);
      }
    },
  });
};