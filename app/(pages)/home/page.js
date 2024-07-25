"use client";
import Header from "@/components/header";
//import '../app/globals.css';
import Footer from "@/components/footer";
 
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
 
import Profile from "@/components/Profile";
 
// Home Page after log in
const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
 
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);
 
  if (status === "loading") {
    return <p>Loading...</p>;
  }
 
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Hi {session?.user?.name}, Welcome to NBA Player App
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <Profile />
            </div>
            <div className="col-span-2">
              
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Home</h2>
                <p>News...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
 
export default Home;