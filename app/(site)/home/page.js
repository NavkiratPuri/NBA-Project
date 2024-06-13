import Header from "../../components/header";
//import '../app/globals.css';
import Footer from "@/app/components/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import User from "../../components/user";

// Home Page after log in
const Home = async () => {

  const session = await getServerSession(authOptions);

  // if (!session || session.status !== 'authenticated') {
  //   if (typeof window !== 'undefined') {

  //     // Client-side redirect?
  //     window.location.href = '/newregister';
  //   } else {

  //     // Server-side redirect?
  //     return null;
  //   }
  // }

  // if (!session || session.status !== 'authenticated') {
  //   return {
  //     redirect: {
  //       destination: '/newregister',
  //       permanent: false,
  //     },
  //   };
  // }
    let debugSesh;
    if (!session || session.status !== 'authenticated') {
       debugSesh = "Session exists and is authenticated";
    }else{
       debugSesh = "Session does not exist or is not authenticated";
    }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center my-8">Welcome to NBA Player App</h1>
          <p className="text-xl text-gray-700 text-center">Your job is to update the player database. You can Delete, Update, and Add new players to the NBA player app for the 2023 - 2024 NBA season.</p>
        </div>
        <div className="container m-20 px-4 text-center">
          <p >Hi {session?.user?.name}</p>
        </div>
        <p>debug: {JSON.stringify(session)}</p>
        <p>debug: {debugSesh}</p>
        <User />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
