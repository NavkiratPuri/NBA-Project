import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import TeamDetails from "@/components/TeamDetails";

const TeamPage = ({ team }) => {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <TeamDetails team={team} />
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { team } = context.params;

  return { props: { team } };
}

export default TeamPage;
