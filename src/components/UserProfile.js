import React from 'react';
import { Avatar } from '@mui/material';
import Post from "./Post";
import "../css/UserProfile.css"
import Header from './Header'
import { useParams} from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import db from '../firebase/firebase'



function UserProfile(){
    const [userData, setUserData] = React.useState('');
    const { username } = useParams();
    React.useEffect(() => {
        if(!username) return
        getDoc(doc(db, 'users', username))
        .then((snapshot) => setUserData(snapshot.data()),
            (error) => alert(error.message)
        )
    }, [username])
    return (
        <>
        <Header />
        <div className='userProfile'>
            <div className='userProfile__header'>
            <Avatar
                className="userProfile__header_avatar"
                alt="micheal"
                src="https://source.unsplash.com/random"
                sx={{ width: 150, height: 150 }}
                 />
            <div className='userProfile__header_info'>
                <div>
                <h3 className='userProfile__header_info_username'>{userData.username}</h3>
                <button className='userProfile__header_info_followBtn'>Follow</button>
                </div>
                <div className='userProfile__header_info_details' >
                <p className="userProfile__header_info_details_posts">13 posts</p>
                <p className='userProfile__header_info_details_followers'>3.5m followers</p>
                <p className='userProfile__header_info_details_followings'>143 following</p>
                </div>
                {/* <div>
                </div> */}
            </div>
            </div>
            <div className='userProfile__posts'>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/user/wsanter'/>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/random/300×300'/>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/user/wsanter'/>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/random/900×700/mango'/>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/random/?city,night'/>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/random/300×300'/>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/random'/>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/random/?city,night'/>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/user/wsanter'/>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/random/?city,night'/>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/random/300×300'/>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/random/?city,night'/>
            <Post key='123' user={undefined} postId='' username={userData.username} text='caption' imageUrl='https://source.unsplash.com/random'/>
            </div>
        </div>
        </>
    )
}

export default UserProfile;