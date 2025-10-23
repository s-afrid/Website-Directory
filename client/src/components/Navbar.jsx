import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Explore', href: '#explore' },
        { name: 'Sponsor', href: '#sponsor' },
        { name: 'About', href: '#about' },
        { name: 'Submit', href: '#submit' },
    ];

    // Tailwind classes for consistent styling
    const baseLinkClass = "text-gray-700 transition-colors duration-200 font-medium tracking-wide";
    // Removed border and default hover from mobileLinkClass to apply it conditionally
    const mobileLinkClass = "py-3 w-full text-center";

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-sm backdrop-blur-md">
            {/* Inner container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo */}
                    <div className="shrink-0">
                        <a href="#" className="text-2xl font-bold text-gray-900 tracking-tighter">
                            INSPIRO
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6 w-auto">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`${baseLinkClass} ${
                                    item.name === 'Submit'
                                        ? 'bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white w-auto'
                                        : 'hover:text-gray-900' // Apply default hover to other items
                                }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-900 focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg py-2">
                    <div className="flex flex-col items-center">
                        {navItems.map((item) => (
                            item.name === 'Submit' ? (
                                // Special styling for Submit button
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`${baseLinkClass} w-11/12 text-center my-2 py-2 bg-black text-white rounded-md hover:bg-gray-800 hover:text-white`}
                                >
                                    {item.name}
                                </a>
                            ) : (
                                // Standard styling for other links
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`${baseLinkClass} ${mobileLinkClass} border-b border-gray-200 hover:text-gray-900`}
                                >
                                    {item.name}
                                </a>
                            )
                        ))}
                    </div>
                </div>
            )}
            
            {/* The thin gray divider line is provided by shadow-sm on the nav */}
        </nav>
    );
};

export default Navbar;
