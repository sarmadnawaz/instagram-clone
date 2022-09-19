import React from "react";
import { Avatar } from '@mui/material';
import "../css/UserProfileHeader.css"

function UserProfileHeader({ userData }) {
  const [follow, setFollow] = React.useState(false)
  function handleFollow(){
    setFollow(true);
  }
  return (
      <div className="userProfile__header">
        <Avatar
          className="userProfile__header_avatar"
          alt="micheal"
          src="https://source.unsplash.com/random"
          sx={{ width: 150, height: 150 }}
        />
        <div className="userProfile__header_info">
          <div>
            <h3 className="userProfile__header_info_username">
              {userData.username}
            </h3>
            <button onClick={handleFollow} className="userProfile__header_info_followBtn">
              {follow ? 'Following' : 'Follow'}
            </button>
          </div>
          <div className="userProfile__header_info_details">
            <p className="userProfile__header_info_details_posts">13 posts</p>
            <p className="userProfile__header_info_details_followers">
              3.5m followers
            </p>
            <p className="userProfile__header_info_details_followings">
              143 following
            </p>
          </div>
        </div>
      </div>
  );
}

export default UserProfileHeader;
