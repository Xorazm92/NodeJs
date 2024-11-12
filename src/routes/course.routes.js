import { Router } from 'express';

import { addCourse, deleteCourse, getCourse, updateCourse } from '../controllers/course.controller';

const courseRouter = new Router();

courseRouter.get("/", getCourse);

courseRouter.post('/', addCourse)

courseRouter.put("/:id", updateCourse);

courseRouter.delete("/:id", deleteCourse);

export default courseRouter;