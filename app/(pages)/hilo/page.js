'use client'
import React from 'react';
import HiLo from '@/components/HiLo Game/Hilo';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Hilo = () => {


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

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow">
      {/* <main className="flex-grow justify-content content-center"> */}
        <HiLo />
      </main>
      <Footer />
    </div>
    
  );
};

export default Hilo;
