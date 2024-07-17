import Header from '@/components/header'; 
import Footer from '@/components/footer'; 
import TeamDetails from '@/components/TeamDetails';

const TeamPage = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <TeamDetails />
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
