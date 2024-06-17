import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import CreatePostForm from '../components/Admin/CreatePostForm';

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/posts')
         .then(res => setPosts(res.data))
         .catch(error => console.error(error));
    }, []);

    const deletePost = (id) => {
        axios.delete(`/api/posts/${id}`)
         .then(() => setPosts(posts.filter(post => post.id !== id)))
         .catch(error => console.error(error));
    }
    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4 text-center'>Admin Dashboard</h1>
            <CreatePostForm />
            <table className='max-w-screen-sm w-full mx-auto bg-white border-2 mt-6'>
                <thead>
                    <tr>
                        <th className='py-2 text-left px-4 border'>Title</th>
                        <th className='py-2 text-left px-4 border'>Author</th>
                        <th className='py-2 text-left px-4 border'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td className='py-2 px-4 border'>{post.title}</td>
                            <td className='py-2 px-4 border'>{post.author}</td>
                            <td className='py-2 px-4 border'>
                                <div className='text-red-500 flex items-center cursor-pointer'
                                onClick={() => deletePost(post.id)}
                                >
                                <MdDeleteForever className='mr-2'/>

                                <button className='text-red-500'>Delete</button>
                                </div>
                                
                            </td>
                        </tr>
                    ))

                    }
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
