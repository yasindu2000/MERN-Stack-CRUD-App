import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../App.css';

function Home() {


const [posts, setPosts] = useState([]);
const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {

  retrievePosts();

  
}, []);



const retrievePosts = async()=>{

try {

  const res = await axios.get("http://localhost:8000/posts");
  if(res.data.success){
    setPosts(res.data.existingPosts);
  }
  console.log(res.data.existingPosts);
  
} catch (error) {

  console.log("error fetching posts", error)
  
}


}

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/post/delete/${id}`);
    alert('Are you sure...')
    alert('Post deleted successfully');
    retrievePosts(); // Refresh posts after deletion
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};
const filteredPosts = posts.filter((post) =>
  post.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
  post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  post.postCategory.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div className='container'>

      {/* <p>All Posts</p> */}
        
      <input
        type='text'
        className='form-control mb-3'
        placeholder='Search posts...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />


      <table className='table' style={{marginTop:40}}>
        <thead>
          <tr>
             <th scope="col">No</th>
             <th scope="col">Topic</th>
             <th scope="col">Description</th>
             <th scope="col">Post Category</th>
             <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
            {filteredPosts.map((post, index)=>(
        <tr key={index}>
          <th scope="row">{index + 1}</th>
         
          <td>
            <a href={`/post/${post._id}`}  style={{textDecoration:"none"}}>
            {post.topic}
            </a>
          </td>

          <td>{post.description}</td>
          <td>{post.postCategory}</td>
          <td>

            <a className='btn btn-warning' href={`/edit/${post._id}`}>
              <li className='fas fa-edit'></li>&nbsp;Edit
            </a>
            &nbsp;
            <a className='btn btn-danger' onClick={() => handleDelete(post._id)}>
              <li  className='fas fa-trash'></li>&nbsp;Delete
            </a>
          </td>
        </tr>
      ))}

        </tbody>
      </table>
      <button className='btn btn-success'><a href='/add' style={{textDecoration:"none",color:"white"}}>Create New Post</a></button>

      
    </div>
  )
}

export default Home