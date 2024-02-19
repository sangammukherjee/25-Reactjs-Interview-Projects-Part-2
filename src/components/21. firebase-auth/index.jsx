import { auth } from "../../firebase-config";
import AuthPage from "./auth-page";
import UnauthPage from "./unauth-page";
import { useAuthState } from "react-firebase-hooks/auth";
import './firebase-auth.css'

function FirebaseAuth() {
  const [user, loading, error] = useAuthState(auth);

  console.log(user, error, loading, "raj");

  const content = loading ? (
    <h1>Loading! Please wait</h1>
  ) : user ? (
    <AuthPage />
  ) : (
    <UnauthPage />
  );

  return (
    <div className="firebase-auth-container">
      <h1>Firebase Auth</h1>
      {content}
    </div>
  );
}

export default FirebaseAuth;
