import React from "react";
import db, { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import "../css/ImageUpload.css";

function ImageUpload({ username }) {
  const [caption, setCaption] = React.useState("");
  const [image, setImage] = React.useState(0);
  const [progress, setProgress] = React.useState("");

  const handleChange = (e) => {
    e.target.files[0] && setImage(e.target.files[0]);
  };

  const handleUpload = (e) => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(collection(db, "posts"), {
            timestamp: serverTimestamp(),
            caption,
            imageUrl: downloadURL,
            username,
          }).catch((error) => alert(error.message))
          setProgress(0);
          addDoc(collection(db, "users", username, "posts"), 
          {
            timestamp: serverTimestamp(),
            caption,
            imageUrl: downloadURL,
            username,
          }).catch((error) => alert(error.message))
          setCaption("");
          setImage(null);
        });
      }
    );
  };

  return (
    <div className="imageUpload__container">
    <div className="imageUpload">
      <div className="imageUpload__header">
        <Avatar
          className="imageUpload__header_avatar"
          alt="micheal"
          src={`https://www.computerhope.com/comp/logos/facebook.png`}
        />
        <h3>{username}</h3>
      </div>
      {
        image || caption ? (
            <progress
              className="imageUpload__progress"
              value={progress}
              max="100"
            ></progress>
        ) : ( <h3 className="imageUpload__text">Upload an Image</h3>)
      }
      <div>
        <input
          type="file"
          className="imageUpload__imageInput"
          onChange={handleChange}
        />
      </div>
      <div className="imageUpload__captionInput">
        <input
          className="imageUpload__caption"
          type="text"
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button
          className="imageUpload__uploadBtn"
          type="submit"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
    </div>
  );
}

export default ImageUpload;
