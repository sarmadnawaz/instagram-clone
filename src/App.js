import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import db, { auth } from "./firebase/firebase";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard"
function App() {
  const [user, setUser] = React.useState(null);
  const [userData, setUserData] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [status, setStatus] = React.useState('idle')
 
  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, [user]);

  React.useEffect(() => {
    if (user) {
      const email = user.email;
      getDocs(collection(db, "users")).then((snapshot) => {
        let document;
        const [doc] = snapshot.docs.filter((doc) => {
          document = doc.data();
          return document.email.toLowerCase() === email;
        });
        setUserData(doc.data());
      });
    }
  }, [user]);

  React.useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts"),
      orderBy("timestamp"),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      }
    );
    return () => unsub();
  }, []);
  
  return (
    <>
    <Header user={user} />
    <Dashboard user={user} userData={userData} posts={posts} />
    </>
  );
}

export default App;
