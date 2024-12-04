import { getPostService, createPostService, updatePostService, getPostbyIdService, deletePostService } from '../services/index.js';

const getPost =async(req, res, next)=>{
    try {
        // const       
        const posts = await getPostService();
        res.json(posts);
      } catch (error) {
        res.status(400).send(error.message);
      }
}

const createPost =async(req, res, next)=>{
    try {
        const post = await createPostService(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePost =async(req, res, next)=>{
    try {
        const postId  = req.params.id;
        console.log('id : ',req.params);
        
        const postdata = req.body;
        const updated = await updatePostService(postId, postdata);
        if (updated) {
          const updatedPost = await getPostbyIdService(postId);
          res.status(200).send(updatedPost);
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        res.status(500).send(error);
      }    
}

const deletePost =async(req, res, next)=>{
    try {
        const { id } = req.params;
        const deleted = await Post.destroy({
          where: { id: id }
        });
        if (deleted) {
          res.status(204).send("Post deleted");
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        res.status(500).send(error);
      }
}

export default {getPost, createPost, updatePost, deletePost};