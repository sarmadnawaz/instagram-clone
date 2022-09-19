import React from "react";
import Avatar from "@mui/material/Avatar";
import "../css/Post.css";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import db from '../firebase/firebase'
import { Link } from "react-router-dom";


function Post({ user, postId, username, caption, imageUrl = "" }) {
  const [comments, setComments] = React.useState([])
  const [comment, setComment] = React.useState([])
  React.useEffect(() => {
    if(!postId) return
      const unsub = onSnapshot(collection(db, 'posts', postId, 'comments'), 
      (snapshot) => setComments(snapshot.docs.map(doc => doc.data())),
      (error) => console.log(error.message))
      return () => unsub()
  }, [postId])

  const postComment = (event) => {
    event.preventDefault();
    addDoc(collection(db, 'posts', postId, 'comments'), {
      text : comment,
      username : user.displayName
    }).then(
      () => setComment(''),
      () => console.log('could not post a comment')
    )
  }

  return (
    <div className="post">
      <Link className="post__header-Link"to={`/${username}`}>
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="micheal"
          src="https://source.unsplash.com/random"
        />
        <h3>{username}</h3>
      </div>
      </Link>
      <img className="post__image" src={imageUrl} />
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
      <div className="post__comments">
        {
          comments.map((comment) => (
            <p>
              <b>{comment.username}</b> {comment.text}
            </p>
        ))}
      </div>
      { user && <form className="post__commentBox" onSubmit={postComment}>
        <input className="post__input"
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        />
        <button className="post__button"
        disabled={!comment}
        type="submit"
        >post</button>
      </form> }
    </div>
  );
}

export default Post;
