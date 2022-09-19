import React from "react";
import Post from "./Post";
import "../css/UserProfile.css";
import LoadingSpinner from "./LoadingSpinner";
import Page404 from "./Page404";
import Header from "./Header";
import UserProfileHeader from "./UserProfileHeader";
import { useParams } from "react-router-dom";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from "../firebase/firebase";

function UserProfile() {
  const [userData, setUserData] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const [status, setStatus] = React.useState("idle");
  const { username } = useParams();

  React.useEffect(() => {
    if (!username) return;
    getDoc(doc(db, "users", username))
      .then((snapshot) => {
        if (!snapshot.data()) setStatus("rejected");
        else {
          setUserData(snapshot.data());
          setStatus("partiallySuccess");
        }
      })
      .catch((error) => setStatus("partiallySuccess"));
  }, [username]);

  React.useEffect(() => {
    if (!userData) return;
    getDocs(collection(db, "users", username, "posts"))
      .then((snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()));
        if (snapshot.docs) setStatus("success");
        else setStatus("partiallyRejected");
      })
      .catch((error) => setStatus("partiallyRejected"));
  }, [userData, username]);

  return (
    <>
      <Header />
      {status === "idle" && <LoadingSpinner />}
      <div className="userProfile">
        {status === "rejected" && <Page404 />}
        {(status === "partiallySuccess" ||
          status === "success" ||
          status === "partiallyRejected") && (
          <UserProfileHeader userData={userData} />
        )}
        {status === "partiallyRejected" && (
          <h2 className="userProfile__noPosts_msg">
            User haven't post anything yet
          </h2>
        )}
        {status === "success" && (
          <div className="userProfile__posts">
            {posts.map((post) => (
              <Post
                user={undefined}
                postId=""
                username={post.username}
                text={post.caption}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfile;
