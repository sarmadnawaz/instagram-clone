import React from "react";
import Post from "./Post";
import { InstagramEmbed } from "react-social-media-embed";
import "../css/Feed.css"

function Feed({ user, posts }) {
  return (
    <div className="feed">
      <div className="feed_left">
        {posts.map(({ id, post }) => {
          return <Post key={id} user={user} postId={id} {...post} />;
        })}
      </div>
      <div className="feed_right">
        <InstagramEmbed
          url="https://www.instagram.com/p/CgmUdeDI-l5/?igshid=NDRkN2NkYzU%3D"
          width={328}
        />
        <InstagramEmbed
          url="https://www.instagram.com/p/Chzjj3XoAej/?igshid=NDRkN2NkYzU="
          width={328}
        />
        <InstagramEmbed
          url="https://www.instagram.com/p/CUbHfhpswxt/"
          width={328}
        />
      </div>
    </div>
  );
}

export default Feed;
