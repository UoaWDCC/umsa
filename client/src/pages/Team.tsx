import MemberInfo from "../components/MemberInfo";
import { useEffect } from "react";

export default function Team() {
  useEffect(() => {
    document.title = "Meet the Team | UMSA";
  }, []);

  return (
    <>
      <div className="text-left">
        <h1 className="text-8xl font-heading font-bold mb-8 text-accent1-primary">Meet the <span className="text-accent2-primary">Team</span></h1>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {/* Place MemberInfo components here */}
        <MemberInfo
          stats={{
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ-MDQnUa65wBv1XnRZxo9J1vIlljHLP87zA&s",
            fullName: "Chester Ow Yong",
            role: "President",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
          }}
        />
        <MemberInfo
          stats={{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "Joie Ting",
            role: "Vice President",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
          }}
        />
        <MemberInfo
          stats={{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            role: "Treasurer",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
          }}
        />
        <MemberInfo
          stats={{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            role: "Secretary",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
          }}
        />
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {/* Place MemberInfo components here */}

        <MemberInfo
          stats={{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            role: "Member",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
          }}
        />
        <MemberInfo
          stats={{
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
