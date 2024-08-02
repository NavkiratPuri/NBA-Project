"use client";
import React, { useState } from "react";
import Trivia from "@/components/Trivia";
import Header from "@/components/header";
import AddQuestion from "@/components/Addquestion";
import Footer from "@/components/footer";

const TriviaPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-700">
      <Header />
      <Trivia />
      {showModal && (
        <AddQuestion showModal={showModal} setShowModal={setShowModal} />
      )}
      <div className="px-4 pb-4"> {/* Added padding around the button */}
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => setShowModal(true)}
        >
          Add a new trivia question
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default TriviaPage;
