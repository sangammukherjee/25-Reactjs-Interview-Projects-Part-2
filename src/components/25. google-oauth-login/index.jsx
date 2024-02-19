import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

function GoogleOAuthLogin() {
  const [authInfo, setAuthInfo] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => setAuthInfo(response),
    onError: (error) => setErrorInfo(error),
  });

  async function fetchProfileInfo() {
    const apiResponse = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${authInfo?.access_token}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authInfo?.access_token}`,
          Accept: "application/json",
        },
      }
    );

    const result = await apiResponse.json();
    setProfileInfo(result)

    console.log(result, "sangam");
  }

  function handleLogout(){
    googleLogout();
    setAuthInfo(null);
    setProfileInfo(null)
  }

  useEffect(() => {
    if (authInfo) fetchProfileInfo();
  }, [authInfo]);

  console.log(authInfo, profileInfo, 'profileInfo');

  return (
    <div className="google-auth-login-container">
      <h1>Google Auth Login Container</h1>
      {profileInfo !== null ? (
        <div>
          <img src={profileInfo?.picture} alt="Profile Info" />
          <p>{profileInfo?.name}</p>
          <p>{profileInfo?.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleGoogleLogin}>Google Login</button>
      )}
    </div>
  );
}

export default GoogleOAuthLogin;
