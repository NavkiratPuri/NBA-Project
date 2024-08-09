"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";

const AdminRequests = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated" && session.user.isAdmin) {
      axios
        .get("/api/adminrequests")
        .then((response) => {
          setRequests(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } 
  }, [status, session, router]);

  const handleRequest = async (id, action) => {
    try {
      if (action === "approve") {
        await axios.patch(`/api/adminrequests/${id}`, { action });
      } else if (action === "deny") {
        await axios.delete(`/api/adminrequests/${id}`);
      }
      setRequests(requests.filter((req) => req.id !== id));
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-700">
      <Header />
      <main className="flex-grow">
        <div className="max-w-md mx-auto mt-10 p-4 border border-indigo-600 rounded-md shadow-md bg-gray-800">
          <h2 className="text-xl font-bold mb-4 text-white">Admin Privilege Requests</h2>
          {requests.length === 0 ? (
            <p className="text-orange-400">No pending requests.</p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="mb-4 p-4 border rounded-md text-white">
                <p><strong>Name:</strong> {req.name}</p>
                <p><strong>Email:</strong> {req.email}</p>
                <p><strong>Message:</strong> {req.message}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleRequest(req.id, "approve")}
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRequest(req.id, "deny")}
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700"
                  >
                    Deny
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminRequests;
