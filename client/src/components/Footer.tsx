import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
    const footerLinkClass = "text-left text-gray-400 hover:text-white cursor-pointer"

    return (
        <>
        {/* Footer elements */}
        <nav className='mx-6 py-4 gap-4 flex flex-col'>
            {/* Main footer content */}
            <div className='flex flex-row gap-20 mx-6 text-sm'>
                {/* Page Navigation */}
                <div className='flex flex-col'>
                    <p className='text-left font-bold'>Pages</p>
                    <Link to="/" className={footerLinkClass}>Home</Link>
                    <Link to="/project-team" className={footerLinkClass}>project team</Link>
                    <Link to="/sign-up" className={footerLinkClass}>Sign Up</Link>
                    <Link to="/gallery" className={footerLinkClass}>Gallery</Link>
                </div>

                {/* Events Navigation */}
                <div className='flex flex-col'>
                    <p className='text-left font-bold'>Events</p>
                    <HashLink to="/events#upcoming-events-section" className={footerLinkClass}>Upcoming Events</HashLink>
                    <HashLink to="/events#past-events-section" className={footerLinkClass}>Past Events</HashLink>
                </div>

                {/* External Links */}
                <div className='flex flex-row gap-4 items-center ml-auto'>
                    <a href="https://www.instagram.com/umsanz/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-3xl text-grey-300 hover:text-white" />
                    </a>
                    <a href="https://www.facebook.com/umsanz/" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-3xl text-grey-300 hover:text-white" />
                    </a>
                </div>
            </div>

            {/* Copyright bottom footer */}
            <div className='flex flex-row justify-between text-sm text-gray-600 mx-6'>
                <p>
                    All rights reserved UMSA 2026.
                </p>
                <p>
                    Design and Developed by <a href="https://wdcc.co.nz/" target="_blank" rel="noreferrer" className='underline'>WDCC</a>
                </p>
            </div>
        </nav>
        </>
    )
}