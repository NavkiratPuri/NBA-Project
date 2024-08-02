"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";

const Request = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      axios
        .get("/api/user")
        .then((response) => {
          setProfile(response.data);
          setLoading(false);
          if (response.data.isAdmin) {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          setFetchError(error);
          setLoading(false);
        });
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.length > 125) {
      setError("Message is too long. Maximum 125 characters allowed.");
      return;
    }

    try {
      await axios.post("/api/adminrequests", {
        message,
        email: session.user.email,
        name: session.user.name,
      });
      setSuccess(true);
      setMessage("");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }

  if (isAdmin) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-700">
        <Header />
        <main className="flex-grow">
          <div className="mt-4 p-4 rounded-lg text-center">
            <h1 className="text-2xl font-semibold text-white">You are already an Admin!</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="flex flex-col min-h-screen bg-gray-700">
        <Header />
        <main className="flex-grow">
          <div className="max-w-md mx-auto mt-10 p-4 border rounded-md shadow-md border-indigo-700 bg-gray-800">
            <h2 className="text-xl font-bold mb-4 text-white">Request Admin Privileges</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white"
                >
                  Why do you want to be an admin?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (e.target.value.length <= 125) setError(false);
                  }}
                  maxLength="125"
                  rows="3"
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 text-black"
                  placeholder="Explain in 125 characters or less..."
                  required
                ></textarea>
                <p
                  className={`text-sm mt-1 ${
                    message.length > 125 ? "text-red-600" : "text-white"
                  }`}
                >
                  {message.length}/125
                </p>
              </div>
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
              {success && (
                <p className="text-green-600 text-sm mb-4">
                  Request sent successfully!
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-900 text-white text-sm font-semibold py-2 rounded-md shadow-md hover:bg-indigo-700 transition duration-200"
              >
                Submit Request
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
};

export default Request;
