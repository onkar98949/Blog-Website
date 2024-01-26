import React from 'react';
import {format} from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({_id,title,summary,cover,content,createdAt,author}) => {
  return (
    <div className='flex bg-amber-100 h-30 w-4/5 mx-auto my-10 rounded-lg overflow-hidden' style={{backgroundColor:"rgba(245,245,245)"}}>
                <div className='w-2/5 h-2/5'>
                    <Link to={`/post/${_id}`}>
                    <img src={'http://localhost:8000/'+cover} alt='CoverPhoto'></img>
                    </Link>
                </div>
                <div className='mx-10 mt-2 w-1/2 h-1/2'>
                    <Link to={`/post/${_id}`}>
                    <h2 className='font-semibold text-3xl'>{title}</h2>
                    </Link>
                    <div className='my-3'>
                        <p className='text-sm my-1'>{author.email}</p>
                        <p className='text-sm my-1'>{format(new Date(createdAt),'d MMM yyyy, HH:mm')}</p>
                    </div>
                    <div className='overflow-hidden h-14'>
                    <p className='text-lg font-medium'>{summary}</p>
                    </div>
                    <div className='h-24 overflow-hidden mt-2'>
                        <p className='' dangerouslySetInnerHTML={{__html:content}}></p>
                    </div>
                   
                </div>
            </div>
  )
}

export default Post