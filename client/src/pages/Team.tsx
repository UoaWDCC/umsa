import MemberInfo from "../components/MemberInfo";
import { useEffect } from "react";


export default function ProjectTeam() {
    useEffect(() => {
    document.title = "Meet the Team | UMSA";
    }, []);

  return (
    <>
    <div>
        <h1 className="text-3xl font-bold mb-8">Meet the Team</h1>
    </div>
    <h3 className="text-xl font-bold mb-4">Executive Section</h3>
    <div className="flex flex-wrap gap-8 justify-center">
        {/* Place MemberInfo components here */}
        <MemberInfo
        stats = {{
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ-MDQnUa65wBv1XnRZxo9J1vIlljHLP87zA&s",
            fullName: "tap on the screen",
            role: "President",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
        }}
        />
        <MemberInfo
        stats = {{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            role: "Vice President",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
        }}
        />
        <MemberInfo
        stats = {{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            role: "Treasurer",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
        }}
        />
        <MemberInfo
        stats = {{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            role: "Secretary",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
        }}
        />
    </div>
    <h3 className="text-xl font-bold mb-4">Member Section</h3>
    <div className="flex flex-wrap gap-8 justify-center">
        {/* Place MemberInfo components here */}
        
        <MemberInfo
        stats = {{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            role: "Member",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
        }}
        />
        <MemberInfo
        stats = {{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            role: "Member",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
        }}
        />
    </div>
    </>
);

}