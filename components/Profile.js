import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import FavPlayer from "@/components/FavPlayer";
import FavTeam from "@/components/FavTeam";

const Profile = () => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get("/api/user")
        .then((response) => {
          setProfile(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [status]);

  if (status === "loading" || loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="text-center mt-4">You need to be authenticated to view your profile.</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        Error: {error.message}
        <p>Debug: {status}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">{profile.name}</h2>
      {session.user.isAdmin && <p className="text-lg mb-2 text-center"><span className="font-semibold">App Admin</span></p>}
      <div className="text-center mb-4">
        <a
          href="/edit-account"
          className="inline-block bg-indigo-900 text-white text-sm font-semibold py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 transition duration-200"
        >
          Edit Account
        </a>
      </div>
      <div className="mt-4">
        <FavPlayer playerId={profile.favPlayerId} />
      </div>
      <div className="mt-4">
        <FavTeam teamId={profile.favTeamId} />
      </div>
    </div>
  );
};

export default Profile;
