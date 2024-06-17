import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEdit } from "react-icons/fa";
import CreatePostModal from '../components/CreatePostModal';

const ClientPage = () => {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('/api/posts')
         .then(res => setPosts(res.data))
         .catch(error => console.error(error));
    }, []);
    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4 text-center'>Blog Posts</h1>
            <div className="flex items-center justify-center gap-3">
            <FaEdit  
             onClick={() => setIsModalOpen(true)}
             className='text-blue-500 hover:text-blue-700 cursor-pointer'
            />
            <button
            >
                 Add Post
            </button>
            </div>
            
            {posts.map(post => (
                <motion.div key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                transition={{ duration: 0.5 }}
                className='mb-4 max-w-screen-md mx-auto'>
                    <h2 className='text-xl font-bold'>{post.title}</h2>
                    <p className='text-gray-700'>{post.content}</p>
                    <p className='text-gray-500 text-sm'>Author: {post.author}</p>
                </motion.div>
            ))}

            {isModalOpen && (
                <CreatePostModal 
                onClose={() => setIsModalOpen(false)}
                onPostCreated={(newPost) => setPosts([newPost, ...posts])}
                />
            )}
        </div>
    );
}

export default ClientPage;
