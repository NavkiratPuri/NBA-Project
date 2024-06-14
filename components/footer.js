import React from 'react';

// Footer component
const Footer = () => {
    return (
        <footer className="absoulte bg-orange-800 text-white">
            <div className="container mx-auto py-4 px-4 text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} NBA Player App. All rights reserved.
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="hover:text-orange-300">Terms of Service</a>
                    <a href="#" className="hover:text-orange-300">Privacy Policy</a>
                    <a href="#" className="hover:text-orange-300">About Us</a>
                    <a href="#" className="hover:text-orange-300">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
