import {validateAssigment} from './assigment.middleware.js'
import {validateCourse} from './course.middleware.js'
import {validateStudent} from './students.middleware.js'
import {validateTeacher} from './teachers.middleware.js'
import {validateUser} from './user.middleware.js'

const Validators = {
    validateAssigment,
    validateCourse,
    validateStudent,
    validateTeacher,
    validateUser
}

export default Validators