import  { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'



function PostDetails() {

const {id} = useParams();
const [post, setPost] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
  
  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/post/${id}`);
      
        setPost(res.data);
        
      
      console.log(res.data)
      
    } catch (error) {
      console.error("Error fetching post:", error);
      setError('Failed to load post');
    }
  };

  fetchPost();
}, [id]);



if (!post && !error) return <p>Loading...</p>;


  return (
    <div>
      <h2>Post Details</h2>
      <hr/>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        
        <d1 className='row'>
          <dt className='col-sm-3'>Topic:</dt>
          <dd className='col-sm-9'> {post?.topic || "No topic available"}</dd>
          <dt className='col-sm-3'>Description:</dt>
          <dd className='col-sm-9'> {post?.description || "No description available"}</dd>
          <dt className='col-sm-3'>Category:</dt>
          <dd className='col-sm-9'> {post?.postCategory || "No category available"}</dd>
        </d1>
      )}
    </div>
  )
}

export default PostDetails