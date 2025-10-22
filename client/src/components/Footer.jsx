import React from 'react';
import { Instagram } from 'lucide-react'; // X is replaced by inline SVG

/**
 * Renders a responsive footer component based on the provided design.
 */
const Footer = () => {
    // Data structure for navigation links
    const navLinks = [
        { title: "Explore", href: "#explore" },
        { title: "Sponsor", href: "#sponsor" },
        { title: "About", href: "#about" },
    ];

    const legalLinks = [
        { title: "Privacy and Terms", href: "#privacy" },
        { title: "Contact", href: "#contact" },
    ];

    // Inline SVG for the X logo using the known, official path data for accuracy.
    const XLogo = ({ size = 24, className = "" }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 1200"
            width={size}
            height={size}
            className={className}
            fill="currentColor"
        >
            {/* Updated path for the modern X logo */}
            <path d="M714.163 519.28L1126.93 0H1039.2L687.96 463.35L383.91 0H0L456.6 673.57L0 1200H87.77L500.35 711.63L822.04 1200H1200L714.163 519.28ZM547.24 647.88L413.43 454.75L138.36 78.48H276.92L570.64 492.25L758.38 748.27L1022.46 1122.91H883.89L547.24 647.88Z" />
        </svg>
    );


    return (
        // Main container uses a light, dusty pink/gray background color
        <footer className="bg-stone-300/60 font-['Rubik'] text-gray-800 pt-16 pb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Main Content Grid: Columns on Desktop, Stacked on Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 pb-12 border-b border-gray-400/50">
                    
                    {/* Column 1: Company Info & Newsletter */}
                    <div className="md:col-span-1">
                        <h2 className="text-3xl font-bold mb-3">Company Name</h2>
                        <p className="text-sm mb-6 text-gray-600">
                            Website tagline will come here
                        </p>
                        
                        {/* Newsletter Signup */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                className="px-4 py-2 w-full sm:w-auto flex-grow rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                            />
                            <button 
                                className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-black transition duration-200 text-sm"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Column 2: Explore Links */}
                    <div className="md:col-start-3 md:col-span-1 lg:col-start-3 lg:col-span-1">
                        <h3 className="text-lg font-semibold mb-4 opacity-0 md:opacity-100 h-0 md:h-auto">Quick Links</h3> {/* Placeholder for alignment */}
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.title}>
                                    <a 
                                        href={link.href} 
                                        className="text-gray-700 hover:text-gray-900 transition text-base"
                                    >
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Legal & Social Links */}
                    <div className="lg:col-start-4 lg:col-span-1">
                         <h3 className="text-lg font-semibold mb-4 opacity-0 md:opacity-100 h-0 md:h-auto">Legal</h3> {/* Placeholder for alignment */}
                        <ul className="space-y-3 mb-6">
                            {legalLinks.map((link) => (
                                <li key={link.title}>
                                    <a 
                                        href={link.href} 
                                        className="text-gray-700 hover:text-gray-900 transition text-base"
                                    >
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Social Icons */}
                        <div className="flex space-x-4">
                            {/* Using the custom XLogo component with the specific SVG path */}
                            <a href="#x-social" aria-label="X (formerly Twitter)">
                                <XLogo size={24} className="hover:text-black transition" />
                            </a>
                            <a href="#instagram" aria-label="Instagram">
                                <Instagram size={24} className="hover:text-black transition" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section with Company Logo/Branding */}
            {/* Uses the light pink color from your design */}
            <div className="bg-pink-100/70 py-6 mt-12">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-700">
                    <p className="font-semibold text-lg">Company Logo</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
