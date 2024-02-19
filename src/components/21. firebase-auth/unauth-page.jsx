import { useState } from "react";
import { auth, loginUsingEmailAndPassword, registerUsingEmailAndPassword } from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import FirebaseTodo from "../20. firebase-todo";

function Registration({ formData, setFormData, handleRegister }) {
  return (
    <div className="register">
      <div className="input-wrapper">
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          placeholder="Enter your full name"
          onChange={(event) =>
            setFormData({
              ...formData,
              name: event.target.value,
            })
          }
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(event) =>
            setFormData({
              ...formData,
              email: event.target.value,
            })
          }
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          onChange={(event) =>
            setFormData({
              ...formData,
              password: event.target.value,
            })
          }
          value={formData.password}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

function Login({ formData, setFormData, handleLogin }) {
  return (
    <div className="login">
      <div className="input-wrapper">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(event) =>
            setFormData({
              ...formData,
              email: event.target.value,
            })
          }
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          onChange={(event) =>
            setFormData({
              ...formData,
              password: event.target.value,
            })
          }
          value={formData.password}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

function UnauthPage() {
  const [isLoginView, setIsLoginView] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [user, loading, error] = useAuthState(auth)

  console.log(registerFormData);

  function handleRegister() {
    const { name, email, password } = registerFormData;
    registerUsingEmailAndPassword(name, email, password);
  }

  function handleLogin() {
    const {email, password} = loginFormData;
    loginUsingEmailAndPassword(email, password)
  }

  return (
    <div className="unauth-page-container">
      <div className="unauth-tab-view-container">
        <button onClick={() => setIsLoginView(false)}>Register View</button>
        <button onClick={() => setIsLoginView(true)}>Login View</button>
      </div>
      {isLoginView ? (
        <Login
          formData={loginFormData}
          setFormData={setLoginFormData}
          handleLogin={handleLogin}
        />
      ) : (
        <Registration
          formData={registerFormData}
          setFormData={setRegisterFormData}
          handleRegister={handleRegister}
        />
      )}

      <FirebaseTodo authInfo={user}/>
    </div>
  );
}

export default UnauthPage;
