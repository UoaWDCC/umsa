import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <div className="bg-[#000000] w-full p-20 items-center justify-center rounded-lg">
        <h1 className="text-4xl font-bold text-white">Contact us!</h1>
      </div>

      <div>
        <h1 className="text-3xl mt-10 mb-5 font-bold italic text-left">
          Find us online! (╭ರ_•́)
        </h1>

        <div className="flex gap-4 mt-4">
          <a href="https://www.instagram.com/umsanz/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-3xl text-pink-300 hover:text-white" />
          </a>

          <a href="https://www.facebook.com/umsanz/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-3xl text-pink-300 hover:text-white" />
          </a>
    
          <a href="mailto:minahil12323@gmail.com?subject=Contact%20from%20website">
            <FaEnvelope className="text-3xl text-pink-300 hover:text-white" />
        </a>
          
        </div>
      </div>
    </>
  );
}