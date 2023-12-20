import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const CreatePost = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [summary, setSummary] = useState();
    const [content, setContent] = useState();
    const [files, setFiles] = useState();

    async function createNewPost(e) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        e.preventDefault();
        const response = await fetch('http://localhost:8000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })

        if (response.ok) {
            navigate('/')
        }
    }

    return (
        <div>
            <Navbar />
            <div className='w-4/5 mx-auto'>
                <form onSubmit={createNewPost}>

                    <div class="col mt-10">
                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} class="form-control" placeholder="Title" aria-label="First name"></input>
                    </div>
                    <div class="col mt-3">
                        <input type="text" value={summary} onChange={(e) => { setSummary(e.target.value) }} class="form-control" placeholder="Short Description" aria-label="Last name"></input>
                    </div>

                    <input className='mt-3' type='file' onChange={(e) => { setFiles(e.target.files) }}></input>

                    <ReactQuill className='mt-3' value={content} onChange={newValue => { setContent(newValue) }} modules={modules} formats={formats} />

                    <button type='submit' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-6">
                        Create Post
                    </button>

                </form>
            </div>
        </div>
    )
}

export default CreatePost