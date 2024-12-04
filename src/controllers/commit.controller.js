import { getCommitService, createCommitService, updateCommitService, getCommitbyIdService, deleteCommitService } from '../services/index.js';

const getCommit =async(req, res, next)=>{
    try {
        // const       
        const commits = await getCommitService();
        res.json(commits);
      } catch (error) {
        res.status(400).send(error.message);
      }
}

const createCommit =async(req, res, next)=>{
    try {
        const commit = await createCommitService(req.body);
        res.status(201).json(commit);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCommit =async(req, res, next)=>{
    try {
        const commitId  = req.params.id;
        console.log('id : ',req.params);
        
        const commitdata = req.body;
        const updated = await updateCommitService(commitId, commitdata);
        if (updated) {
          const updatedCommit = await getCommitbyIdService(commitId);
          res.status(200).send(updatedCommit);
        } else {
          throw new Error('Commit not found');
        }
      } catch (error) {
        res.status(500).send(error);
      }    
}

const deleteCommit =async(req, res, next)=>{
    try {
        const { id } = req.params;
        const deleted = await Commit.destroy({
          where: { id: id }
        });
        if (deleted) {
          res.status(204).send("Commit deleted");
        } else {
          throw new Error("Commit not found");
        }
      } catch (error) {
        res.status(500).send(error);
      }
}

export default {getCommit, createCommit, updateCommit, deleteCommit};