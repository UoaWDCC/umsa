import { useState } from "react";
import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [ status, setStatus ] = useState("");

  const handleSubmit = async () => {
    setStatus("Sending");
      const res = await fetch("https://formspree.io/f/xvzlqwkg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      setStatus("Message sent!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Error sending message.");
    }
  };
  return (
    <>
      <div className="bg-[#000000] w-full p-20 items-center justify-center rounded-lg">
        <h1 className="text-4xl font-bold text-white">Contact us</h1>
        <p className="text-white text-center mt-10">
          Have questions or want to get in touch? We&apos;d love to hear from you!
        </p>
        <p className="text-white text-center mt-5">
          Fill out the form below or reach out to us on social media. We look forward to connecting with you! (｡˃ ᵕ ˂ )⸝♡
        </p>
      </div>
      
      <div className="flex flex-col gap-5 max-w-2xl mx-auto mt-1 px-8">
        <input
          type="text"
          placeholder="Enter your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-transparent border-2 border-blue rounded-2xl px-6 py-4 text-white placeholder-gray-400 outline-none focus:border-blue-300 transition"
        />
        <input
          type="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-transparent border-2 border-blue rounded-2xl px-6 py-4 text-white placeholder-gray-400 outline-none focus:border-blue-300 transition"
        />
        <textarea
          placeholder="Enter your Message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="bg-transparent border-2 border-blue rounded-2xl px-6 py-5 text-white placeholder-gray-400 outline-none focus:border-blue-300 transition"
        />  
        <button
          onClick={handleSubmit}
          className="bg-blue-300 text-black font-bold py-3 px-6 rounded-full hover:bg-pink-400 transition"
        >
          Send Message
        </button>
        {status === "sending" && <p className="text-gray-400">Sending...</p>}
        {status === "success" && <p className="text-green-400">Message sent!</p>}
        {status === "error" && <p className="text-red-400">Something went wrong, please try again.</p>}
      </div>

      <div>
        <h1 className="text-3xl mt-10 mb-5 font-bold italic text-center">
          Find us online! (╭ರ_•́)~
        </h1>

        <div className="flex justify-center gap-4 mt-4">
          <a href="https://www.instagram.com/umsanz/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-3xl text-blue-300 hover:text-white" />
          </a>

          <a href="https://www.facebook.com/umsanz/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-3xl text-blue-300 hover:text-white" />
          </a>
    
          <a href="mailto:minahil12323@gmail.com?subject=Contact%20from%20website">
            <FaEnvelope className="text-3xl text-blue-300 hover:text-white" />
        </a>
          
        </div>
      </div>
    </>
  );
}