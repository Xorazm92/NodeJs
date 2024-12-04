import User from '../models/index.js';

const getPostService = async()=>{
    try {
        return await Post.findAll();
    } catch (error) {
        throw error
    }
}

const createPostService = async(data)=>{
    try {
        console.log('data : ', data);
        return await Post.create(data);
    } catch (error) {
        throw error
    }
}

const updatePostService = async(postId, postdata)=>{
    try {
        console.log('postId : ', postId);
        console.log('postdata : ', postdata);
        return await Post.update(postdata, { where: { id: postId }});
    } catch (error) {
        throw error
    }
}

const getPostbyIdService = async(postId)=>{
    try {
        return await Post.findOne({ where: { id: postId } });
    } catch (error) {
        throw error
    }
}

const deletePostService = async()=>{
    try {
        // return await Post.findAll();
    } catch (error) {
        throw error
    }
}

export default {getPostService, createPostService, updatePostService, getPostbyIdService, deletePostService};