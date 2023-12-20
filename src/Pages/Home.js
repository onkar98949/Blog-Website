import React, { useEffect, useState } from 'react'
import Post from '../Components/Post';
import Navbar from '../Components/Navbar';


const Home = () => {
    const [posts,setPosts] =useState([]);

    useEffect(()=>{
       fetch('http://localhost:8000/post',).then(response=>{
        response.json().then(posts=>{
            // console.log(posts);
            setPosts(posts)
        })
       })
    },[])

    return (
        <div>
            <Navbar/>
            {posts.length>0&& posts.map(post=>(
                <Post {...post}/>
            ))}

        </div>
    )
}

export default Home