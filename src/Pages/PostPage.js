import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import {format} from 'date-fns';

const PostPage = () => {
  const [postInfo, setPostinfo] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostinfo(postInfo)
        })
      })
  }, [])

  if (!postInfo) return '';

  return (
    <>
      <Navbar />
      <div className='w-5/6 mx-auto'>
        <h1 className='h3 my-3 mt-4 text-center'>{postInfo.title}</h1>
        <p className='text-sm my-1 text-center'>{postInfo.author.email}</p>
        <p className='text-sm my-1 text-center'>{format(new Date(postInfo.createdAt), 'd MMM yyyy, HH:mm')}</p>
        <div className='w-1/2 h-1/2 mx-auto mt-3'>
          <img src={`http://localhost:8000/${postInfo.cover}`}></img>
        </div>

        <div className='mb-14 mt-10 text-lg' dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
      </div>
    </>
  )
}

export default PostPage