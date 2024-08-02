import React from 'react';

// Footer component
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-1 mt-8">
            <div className="container mx-auto text-center">
                <p className="text-xs">
                    © NBA Player App. All rights reserved.
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="/request" className="hover:text-gray-400 text-xs">Request Admin</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;