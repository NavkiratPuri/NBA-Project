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
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You need to be authenticated to view your profile.</div>;
  }

  if (error) {
    return <div>Error1: {error.message}, <p>Debug: {status}</p> </div>;
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md text-center">
        {/* <p>Debug: {status}</p> */}
        <h1 className="text-2xl font-semibold">
          Profile</h1>
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
        {/* <p>Favorite Player: {profile.favPlayerId}</p>
        <p>Favorite Team: {profile.favTeamId}</p>
        <p>Admin Status: {profile.isAdmin}</p> */}
        

        <FavPlayer playerId={profile.favPlayerId}/>
        <FavTeam teamId={profile.favTeamId}/>


    </div>

  


  );
};

export default Profile;