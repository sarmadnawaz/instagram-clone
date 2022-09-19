import React from 'react';
import Post from "./Post";
import "../css/UserProfile.css"
import Header from './Header'
import UserProfileHeader from './UserProfileHeader';
import { useParams} from 'react-router-dom'
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from '../firebase/firebase'



function UserProfile(){
    const [userData, setUserData] = React.useState('');
    const [posts, setPosts] = React.useState([]);
    const { username } = useParams();


React.useEffect(() => {
        if(!username) return
        getDoc(doc(db, 'users', username))
        .then((snapshot) => setUserData(snapshot.data()))
        .catch((error) => alert(error.message))
    }, [username])

React.useEffect(() => {
        if(!username) return
        getDocs(collection(db, "users", username, "posts"))
        .then((snapshot) => setPosts(snapshot.docs.map(doc => doc.data())))
        .catch(error => alert(error.message)) 
    }, [username])

    
    return (
        <>
        <Header />
        <div className="userProfile">
        <UserProfileHeader userData={userData}/>
            <div className='userProfile__posts'>
             {posts.map(post => <Post user={undefined} postId='' username={post.username} text={post.caption} imageUrl={post.imageUrl} />)}
            </div>
            </div>
        </>
    )
}

export default UserProfile;