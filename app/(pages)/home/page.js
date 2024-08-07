"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Profile from "@/components/Profile";
import { fetchNbaNews } from "@/utils/fetchNbaNews";
 
// Home Page after log in
const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetchNbaNews().then((data) => {
        setArticles(data);
        setLoading(false);
      });
    }
  }, [status, router]);
 
  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }
 
  return (
    <div className="flex flex-col min-h-screen bg-gray-700">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 ">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gray-800 p-4 rounded-lg text-white">
            Hi {session?.user?.name}, Welcome to NBAlytics!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <Profile />
            </div>
            <div className="col-span-2">
              <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-white">Latest NBA News</h2>
                <div className="space-y-4 h-[67rem] overflow-y-auto ">
                  {articles.map((article, index) => (
                    <div
                      key={index}
                      className="p-6 border rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                    >
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline hover:underline text-white visited:text-purple-700"
                      >
                        <h3 className="text-xl font-bold">{article.title}</h3>
                      </a>
                      <p className="text-sm text-orange-400">{article.source}</p>
                    </div>
                  ))}
                </div>
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