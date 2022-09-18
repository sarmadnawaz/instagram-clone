import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import db, { auth } from "../firebase/firebase";
import "../css/Dashboard.css";
import Header from "./Header";
import ImageUpload from "./ImageUpload";
import Feed from "./Feed";

function Dashboard() {
  const [user, setUser] = React.useState(null);
  const [userData, setUserData] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
 
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
    <div className="dashboard">
      <Header user={user} />
      {userData?.username && <ImageUpload username={userData.username} />}
      <Feed user={user} posts={posts} />
    </div>
  );
}

export default Dashboard;
