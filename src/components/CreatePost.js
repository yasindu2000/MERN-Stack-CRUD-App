import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const [post, setPost] = useState({ topic: '', description: '', postCategory: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const res = await axios.post('http://localhost:8000/post/save', post);
            if (res.data.success) {
                setSuccess('Post created successfully!');
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (err) {
            setError('Failed to create post. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Create New Post</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Topic</label>
                        <input type="text" name="topic" className="form-control" placeholder="Enter topic" required value={post.topic} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea name="description" className="form-control" placeholder="Enter description" rows="4" required value={post.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input type="text" name="postCategory" className="form-control" placeholder="Enter category" required value={post.postCategory} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
