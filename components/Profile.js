

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Favs from "@/components/Favs";

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
    <div>
        <p>Debug: {status}</p>
        <h1>Profile</h1>
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <p>Favorite Player: {profile.favPlayerId}</p>
        <p>Favorite Team: {profile.favTeamId}</p>
        <p>Admin Status: {profile.isAdmin}</p>
        

        <Favs email={session.user?.email} playerId={profile.favPlayerId}/>


    </div>

  


  );
};

export default Profile;