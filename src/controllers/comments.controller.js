const Comment = require("../modules/comments.model.js");

export const addComment = async (req,res, next) => {
    try{
        const{
            user_id,
            Comment_title,
            created_date,
            course_id,

            

        } = req.body;
    
    const newComment = await Comment.create({user_id,Comment_title,  created_date, course_id});

    res.status(201).send({ message: "Comment created successfully...", newComment });
    } catch (error) {
        next(error)
    }
}

export const getComment = async (req,res,next) => {
    try {
        res.send(await Comment,find())
    } catch (error) {
       next(error)
    }
}

export const updateComment = async (req,res, next) => {
    try{
        const {id} = req.params
        const{
            user_id,
            Comment_title,
            created_date,
            course_id,

            

        } = req.body;
    
    const updateComment = await Comment.findByIdAndUpdate({user_id,Comment_title,  created_date, course_id}, {new: true});

    res.status(201).send({ message: "Comment created successfully...", updateComment });
    } catch (error) {
        next(error)
    }
};


export const deleteComment = async (req, res, next) => {
    try{
        const{id} = req.params
        const deleteComments = await Comment.findByIdAndDelete(id)

        res.status(200).send({message: "Comment delete Succesfuly ... ", deleteComment})
    } catch (error){
        next(error)
    }
    
}

