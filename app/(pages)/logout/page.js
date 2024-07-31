'use client'
import { useState, useEffect, useCallback } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginHeader from '@/components/LoginHeader';
//import route from '@/app/api/auth/[...nextauth]/route';
//import '../app/globals.css';

export default function LogoutPage() {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [router]); // Dependencies of handleLogout

  useEffect(() => {
    if (confirmLogout) {
      handleLogout();
    }
  }, [confirmLogout, handleLogout]); // Include handleLogout in the dependency array

  const handleConfirmLogout = () => {
    setConfirmLogout(true);
  };

  const handleCancelLogout = () => {
    setConfirmLogout(false);
    router.back();
  };

  return (
    <>
      <LoginHeader />
      <div className="min-h-screen flex mt-20 justify-center">
        
        {!confirmLogout ? (
          <div className="text-center">
            <p className="text-xl font-semibold mb-4">Are you sure you want to log out?</p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleConfirmLogout}>Yes, Log out</button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={handleCancelLogout}>Cancel</button>
          </div>
        ) : (
          <p>Logging out...</p>
        )}
      </div>
    </>
  );
}
