import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase-config";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import FirebaseTodo from "../20. firebase-todo";

function AuthPage() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState(null);

  async function fetchUserDetails() {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const extractCurrentDocument = await getDocs(q);
      const data = extractCurrentDocument.docs[0].data();

      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) fetchUserDetails();
  }, [user, loading]);

  console.log(loading, "userInfo");

  return (
    <div>
      <h1>Auth Page</h1>
      {userInfo ? (
        <div>
          <p>User Name: {userInfo?.name}</p>
          <p>User Email: {userInfo?.email}</p>
        </div>
      ) : null}
      <FirebaseTodo authInfo={user} />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AuthPage;
