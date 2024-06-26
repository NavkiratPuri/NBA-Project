

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

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
        {/* Add more*/}
    </div>
  );
};

export default Profile;