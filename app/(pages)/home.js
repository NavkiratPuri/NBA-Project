'use client'
import Header from "../../components/header";
import '../app/globals.css';
import Footer from "@/components/footer";

// Home Page after log in
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center my-8">Welcome to NBA Player App</h1>
          <p className="text-xl text-gray-700 text-center">Your job is to update the player database. You can Delete, Update, and Add new players to the NBA player app for the 2023 - 2024 NBA season.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
