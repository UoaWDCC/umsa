import { redirect, type LoaderFunctionArgs } from "react-router-dom";

export default async function pageLoader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    const response = await fetch(`/api/verify-invite/token/?token=${token}`);
    if (!response.ok) {
        return redirect("/")
    }
    return response.json();
}