import MemberInfo from "../components/MemberInfo";


export default function ProjectTeam() {

  return (
    <>
    <div>
        <h1 className="text-3xl font-bold mb-8">Meet the Team</h1>
    </div>

    <div className="flex flex-wrap gap-8 justify-center">
        {/* Place MemberInfo components here */}
        <MemberInfo
        stats = {{
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ-MDQnUa65wBv1XnRZxo9J1vIlljHLP87zA&s",
            fullName: "tap on the screen",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
        }}
        />
        <MemberInfo
        stats = {{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
        }}
        />
        <MemberInfo
        stats = {{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
        }}
        />
        <MemberInfo
        stats = {{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
        }}
        />
        <MemberInfo
        stats = {{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
        }}
        />
        <MemberInfo
        stats = {{
            img: "https://cdn.hswstatic.com/gif/hammer-1.jpg",
            fullName: "this is not a drill",
            linkedin: "https://www.linkedin.com/feed/",
            instagram: "https://www.instagram.com/?hl=en",
        }}
        />
    </div>
    </>
);

}