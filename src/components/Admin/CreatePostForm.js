import React, { useState } from 'react';
import axios from 'axios';

const CreatePostForm = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/posts', { title, content, author })
         .then(res => {
            setTitle('');
            setContent('');
            setAuthor('');
            // Handle successful creation (e.g., show notification)
         })
         .catch(error => console.error(error));
    }
    return (
        <form onSubmit={handleSubmit} className='max-w-screen-md mx-auto w-full'>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Title</label>
                <input 
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-black'
                />
            </div>

            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Content</label>
                <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-black'
                />
            </div>

            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Author</label>
                <input 
                type='text'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-black'
                />
            </div>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white fonr-bold py-2 px-4 rounded focus:outline-none focus:shadow-black'>Create Post</button>
        </form>
    );
}

export default CreatePostForm;
