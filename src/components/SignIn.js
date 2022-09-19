import React from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import "../css/SignIn.css";
import db, {  auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [signIn, setSignIn] = React.useState(true);
  const [signUp, setSignUp] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const navigate = useNavigate();

  function handleSignInSignUp(e) {
    e.preventDefault();
    if (signUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setDoc(doc(db, "users", username), {
            username,
            email,
            password,
          }).then(
            () => console.log("user stored in fireStore successfully"),
            (error) => alert(error.message)
          );
          navigate("/");
          return updateProfile(userCredential.user, {
            displayName: username,
          });
        })
        .catch((error) => alert(error.message));
    } else if (signIn) {
      signInWithEmailAndPassword(auth, email, password).then(
        () => navigate("/"),
        (error) => alert(error.message)
      );
    }
  }
  return (
    <div className="signIn">
      <form onSubmit={handleSignInSignUp} className="signIn__form">
        <center>
          <img className="app__header_logo" src="/img/logo-1.png" alt="logo" />
        </center>
        {signUp && (
          <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />
          )}
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">{signIn ? "Sign In" : "Sign Up"}</Button>
        <p>
          {signIn ? "Don't have an account?" : "Already have an account?"}
          <Button
            onClick={() => {
              setSignIn(!signIn);
              setSignUp(!signUp);
            }}
          >
            {signIn ? "Sign Up" : "Sign In"}
          </Button>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
