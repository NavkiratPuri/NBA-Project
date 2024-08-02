'use client'
import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Team from '@/components/TeamBuild/team'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const Teambuild = () => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      
        setLoading(false);
      
    }
  }, [status, router]);

  if (status === "loading" || loading) {
      return <p>Loading...</p>;
  }



  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-600">
      <Header />
      <main className="flex-grow">
      <h1 className="text-3xl font-bold text-center mb-4 mt-4 text-white">Team Builder</h1>
        <Team/>
      </main>
      <Footer />
    </div>
    
  );
};

export default Teambuild;
