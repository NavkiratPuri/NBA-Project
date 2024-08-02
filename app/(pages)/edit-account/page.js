"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";

const EditAccount = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState({ email: "", name: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get("/api/user")
        .then((response) => {
          setProfile({ ...response.data, password: "" }); // Don't prefill password field
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [status]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    axios
      .patch("/api/user", profile)
      .then(() => {
        setMessage("Profile updated successfully.");
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      setLoading(true);
      axios
        .delete("/api/user")
        .then(() => {
          router.push("/logout");
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <div>You need to be authenticated to edit your account.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Edit Account</h2>
          {message && <p className="text-green-600 mb-4">{message}</p>}
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password (leave blank to keep current password)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-900 text-white text-sm font-semibold py-2 rounded-md shadow-md hover:bg-indigo-700 transition duration-200"
            >
              Update Account
            </button>
          </form>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="w-full mt-4 bg-red-500 text-white text-sm font-semibold py-2 rounded-md shadow-md hover:bg-red-700 transition duration-200"
          >
            Delete Account
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditAccount;
