import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const CreatePostModal = ({ onClose, onPostCreated }) => {
  const [title, setTitle] = useState(localStorage.getItem("title") || "");
  const [content, setContent] = useState(localStorage.getItem("content") || "");
  const [author, setAuthor] = useState(localStorage.getItem("author") || "");

  useEffect(() => {
    localStorage.setItem("title", title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem("content", content);
  }, [content]);

  useEffect(() => {
    localStorage.setItem("author", author);
  }, [author]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/posts", { title, content, author });
      console.log("Post Created: ", res.data);
      setTitle("");
      setContent("");
      setAuthor("");
      localStorage.removeItem("title");
      localStorage.removeItem("content");
      localStorage.removeItem("author");
      onPostCreated(res.data);
      onClose();
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-75"
    >
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
            id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-black"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
            id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-black"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="author"
            >
              Author
            </label>
            <input
            id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-black"
              required
            />
          </div>
          <button type="submit"
          className='bg-blue-500 hover:bg-blue-700 text-white fonr-bold py-2 px-4 rounded focus:outline-none focus:shadow-black'
          >
            Create Post
          </button>

          <button type="button"
          className='bg-red-500 hover:bg-red-700 text-white fonr-bold py-2 px-4 rounded focus:outline-none focus:shadow-black ml-4'
          onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreatePostModal;
