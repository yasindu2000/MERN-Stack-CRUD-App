import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ topic: '', description: '', postCategory: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/post/${id}`);
                setPost(res.data);
            } catch (error) {
                setError('Failed to fetch post data.');
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/post/update/${id}`, post);
            setSuccess(true);
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setError('Failed to update post.');
        }
    };

    return (
        <Container>
            <h2 className='my-4'>Edit Post</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {success && <Alert variant='success'>Post updated successfully! Redirecting...</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Topic</Form.Label>
                    <Form.Control
                        type='text'
                        name='topic'
                        value={post.topic}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as='textarea'
                        name='description'
                        value={post.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Post Category</Form.Label>
                    <Form.Control
                        type='text'
                        name='postCategory'
                        value={post.postCategory}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Update Post
                </Button>
            </Form>
        </Container>
    );
}

export default EditPost;
