const Course = require("../Schema/courses.model.js");

export const addCourse = async (req, res, next) => {
    try {
        const {comment_id, category_id} = req.body;
        const newCourse = await Course.create({comment_id, category_id});

       
    res.status(201).send({ message: "Course created successfully...", newCourse });

} catch (error) {

  next(error);

}

};

export const getCourse = async (req,res,next) => {
    try{
        res,send(await Course.find())
    } catch (error) {
        next(error)
    }
};

export const updateCourse = async (req,res,next) => {
    try {
        const {comment_id, category_id} = req.body;
        const newCourse = await Course.findByIdAndUpdate({comment_id, category_id}, {new: true});

       
    res.status(200).send({ message: "Course update successfully...", newCourse });

} catch (error) {

  next(error);

}

};

export const deleteCourse = async (req,res,next) => {
    try {
        const {id} = req.params;
        const deleteCourse = await Course.findByIdAndDelete({id});

       
    res.status(200).send({ message: "Course delete successfully...", deleteCourse });

} catch (error) {

  next(error);

}

};


