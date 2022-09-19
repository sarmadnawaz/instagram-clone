import React from "react";
import "../css/Dashboard.css";
import ImageUpload from "./ImageUpload";
import Feed from "./Feed";

function Dashboard({ userData, user, posts}) {
  return <div className="dashboard">
      {(user && userData?.username) && <ImageUpload username={userData.username} />}
      <Feed user={user} posts={posts} />
  </div>
}

export default Dashboard;
