const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

//save post
router.post('/post/save', async (req, res)=>{

  try {
   
    let newPost = new Posts(req.body);
    await newPost.save();

    return res.status(200).json({
        success:"Post saved succesfully"
    })
    
  } catch (error) {
    return res.status(400).json({
        error:error
    })}
})

//get posts

router.get('/posts', async (req, res)=>{

try {

    const posts = await Posts.find();

    return res.status(200).json({
        success:true,
        existingPosts: posts
    });
    
} catch (error) {
    return res.status(400).json({
        error:error
    })}
})

//update posts

router.put('/post/update/:id',async (req, res)=>{


try {

    const post = await Posts.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true});

    if(!post){
        return res.status(400).json({
            error:"Post not found"
            
        });
    }

    return res.status(200).json({
        success:"Update successfully"
    })
    
} catch (error) {
    return res.status(400).json({
        error:error
    })}
})

//delete post

router.delete('/post/delete/:id', async (req, res)=>{

    try {

        const deletedPost = await Posts.findByIdAndDelete(req.params.id);

        if(!deletedPost){
            return res.status(404).json({
                error:"Post not found"
            })
        }

        return res.status(200).json({
            success: "Post deleted successfully",deletedPost
        })
        
    } catch (error) {

        return res.status(400).json({
            message:"Deleted unsuccessful"
        })
        
    }  
})

//get a specific post

router.get('/post/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
    }
});








module.exports = router;


