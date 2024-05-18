import React from 'react';

// Footer component
const Footer = () => {
    return (
        <footer className="w-full bg-orange-800 text-white text-center p-4">
            <p className="text-sm">
                © {new Date().getFullYear()} NBA Player App. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-2">
                <a className="hover:text-orange-300">Terms of Service</a>
                <a className="hover:text-orange-300">Privacy Policy</a>
                <a className="hover:text-orange-300">About Us</a>
                <a className="hover:text-orange-300">Contact Us</a>
            </div>
        </footer>
    );
}

export default Footer;
