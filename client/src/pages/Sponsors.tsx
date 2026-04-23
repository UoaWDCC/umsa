
import { useEffect } from "react";
export default function Sponsors() {
    useEffect(() => {
        document.title = "Sponsors | UMSA";
        }, []);
    
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <h1 className="text-4xl font-bold">Our Sponsors</h1>
            <p className="mt-4 text-gray-400">
                UMSA Sponsors Page
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* SPONSORS WILL GO HERE */}
            </div>
        </div>
        );
}