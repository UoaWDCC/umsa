import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import umsa2  from "../assets/icons/umsa2.png";
import footerWave from "../assets/footerwave.png";

export default function Footer() {
    const footerLinkClass = "text-gray-400 text-white hover:text-gray-200 cursor-pointer"

    return (
        <>
        {/* Footer elements */}
        <nav className='py-4 min-h-50 gap-4 flex flex-row justify-around bg-cover bg-center' 
        style={{backgroundImage: `url(${footerWave})`}}>

            {/* Main footer content */}
            <div className='flex flex-row gap-18 mx-6 mt-12 text-sm'>
                {/* Page Navigation */}
                <div className='flex flex-col text-right'>
                    <Link to="/" className={footerLinkClass}>About Us</Link>
                    <Link to="/Sponsors" className={footerLinkClass}>Sponsors</Link>
                    <Link to="/Events" className={footerLinkClass}>Our Events</Link>
                    <Link to="/Team" className={footerLinkClass}>Meet the Team</Link>
                </div>

                <img src={umsa2} className="size-30 relative -top-8"/>

                {/* Events Navigation */}
                <div className='flex flex-col text-left'>
                    <Link to="/Gallery" className={footerLinkClass}>Photos</Link>
                    <Link to="/Contact" className={footerLinkClass}>Contact Us</Link>
                

                {/* External Links */}
                <div className='flex flex-row gap-4 items-center ml-auto mt-2 mr-13'>
                    <a href="https://www.instagram.com/umsanz/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-3xl text-grey-300 hover:text-white" />
                    </a>
                    <a href="https://www.facebook.com/umsanz/" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-3xl text-grey-300 hover:text-white" />
                    </a>

                    {/* THIS ISJ UST A PLACEHOLDER CUZ THEY DONT HAVE A TWITTER AND IT LOOKS BAD WITHOUT
                    A THIRD ICON */}
                    <a href="https://www.facebook.com/umsanz/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-3xl text-grey-300 hover:text-white" />
                    </a>

                </div>
                </div>
            </div>
        </nav>
        </>
    )
}
