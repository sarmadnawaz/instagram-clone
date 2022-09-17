import "./App.css";
import React from "react";
import Post from "./components/Post";
import db from "./firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase/firebase";
import { collection, doc, onSnapshot, orderBy } from "firebase/firestore";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import ImageUpload from "./components/ImageUpload";
import { InstagramEmbed } from "react-social-media-embed";
import UserProfile from './components/UserProfile'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState(null);
  const handleClose = () => setOpen(false);
  const handleSignInClose = () => setOpen(false);
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return updateProfile(authUser.user, {
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );
    setOpenSignIn(false);
  };

  React.useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User has logged In");
        console.log(user);
        setUser(user);
        if (user.displayName) {
          console.log("fresh User");
        } else {
          updateProfile(user, {
            displayName: username,
          }).then(() => console.log(user));
        }
      } else {
        console.log("User has logged Out");
        setUser(null);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [user, username]);

  React.useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts"),
      orderBy("timestamp"),
      (snapshot) => {
        console.log(snapshot.docs);
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      }
    );
  }, []);
 
  
  return (
    <div className="App">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={signUp} className="app__signUp">
            <center>
              <img
                className="app__header_logo"
                src="/img/logo.png"
                alt="logo"
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Sign Up</Button>
          </form>
        </Box>
      </Modal>
      <Modal open={openSignIn} onClose={handleSignInClose}>
        <Box sx={style}>
          <form onSubmit={signIn} className="app__signIn">
            <center>
              <img
                className="app__header_logo"
                src="/img/logo.png"
                alt="logo"
              />
            </center>
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Sign Up</Button>
          </form>
        </Box>
      </Modal>
      <div className="app__header">
        <img className="app__header_logo" src="/img/logo.png" alt="logo" />
        {user ? (
          <Button onClick={() => signOut(auth)}>LogOut</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>
      <div className="app__posts">
        <div className="app__postsLeft">
          {user?.displayName ? (
            <ImageUpload username={user.displayName} />
          ) : (
            <h3> Sorry you need to login</h3>
          )}
          {posts.map(({ id, post }) => {
            return <Post key={id} user={user} postId={id} {...post} />;
          })}
        </div>
        <div className="app__postsRight" style={{ display: "block" }}>
          <InstagramEmbed
            url="https://www.instagram.com/p/CUbHfhpswxt/"
            width={328}
          />
          <InstagramEmbed
            url="https://www.instagram.com/p/CUbHfhpswxt/"
            width={328}
          />
          <InstagramEmbed
            url="https://www.instagram.com/p/CUbHfhpswxt/"
            width={328}
          />
        </div>
      </div>
    </div>
  );

}

export default App;
