import User from '../models/index.js';

const getCommitService = async()=>{
    try {
        return await Commit.findAll();
    } catch (error) {
        throw error
    }
}

const createCommitService = async(data)=>{
    try {
        console.log('data : ', data);
        return await Commit.create(data);
    } catch (error) {
        throw error
    }
}

const updateCommitService = async(commitId, commitdata)=>{
    try {
        console.log('commitId : ', commitId);
        console.log('commitdata : ', commitdata);
        return await Commit.update(commitdata, { where: { id: commitId }});
    } catch (error) {
        throw error
    }
}

const getCommitbyIdService = async(commitId)=>{
    try {
        return await Commit.findOne({ where: { id: commitId } });
    } catch (error) {
        throw error
    }
}

const deleteCommitService = async()=>{
    try {
        // return await Commit.findAll();
    } catch (error) {
        throw error
    }
}

export default {getCommitService, createCommitService, updateCommitService, getCommitbyIdService, deleteCommitService};