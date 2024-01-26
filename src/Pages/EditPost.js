import React, { useEffect } from 'react'
import Editor from '../Components/Editor';
import { useState } from 'react';
import Navbar from '../Components/Navbar';
import { useParams , useNavigate} from 'react-router-dom';

const EditPost = () => {
    const navigate =useNavigate();
    const {id} = useParams();
    const [title, setTitle] = useState();
    const [summary, setSummary] = useState();
    const [content, setContent] = useState();
    const [files, setFiles] = useState();

    useEffect(()=>{
        fetch('http://localhost:8000/post/'+id)
        .then(response=>{
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            })
        })
    },[])

    async function updatePost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id',id);
        if(files?.[0]){
            data.set('file', files[0]);
        }
        
        const response  = await fetch('http://localhost:8000/post/',{
            method:'PUT',
            body:data ,
            credentials:'include',
        })

        if(response.ok){
            navigate(`/post/${id}`)
        }

    }

    return (
        <div>
            <Navbar />
            <div className='w-4/5 mx-auto'>
                <form onSubmit={updatePost}>

                    <div class="col mt-10">
                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} class="form-control" placeholder="Title" aria-label="First name"></input>
                    </div>
                    <div class="col mt-3">
                        <input type="text" value={summary} onChange={(e) => { setSummary(e.target.value) }} class="form-control" placeholder="Short Description" aria-label="Last name"></input>
                    </div>

                    <input className='mt-3' type='file' onChange={(e) => { setFiles(e.target.files) }}></input>

                    <Editor onChange={setContent} value={content}/>

                    <button type='submit' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-6">
                        Update Post
                    </button>

                </form>
            </div>
        </div>
    )
}

export default EditPost