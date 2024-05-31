import Header from "../components/header";
import '../app/globals.css';
import Footer from "@/components/footer";
import HiLo from "@/components/HiLo";

// Home Page after log in
const hilo = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
       <HiLo></HiLo> 
      </main>
      <Footer />
    </div>
  );
};

export default hilo;
