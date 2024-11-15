import {
    getAllUserService,
    getOneUserByIdService,
    createUserService,
} from '../service/index.js'
import { logger } from '../utils/logger.js'

// Get all users
export const getAllUsers = (req, res, next) => {
    try {
        const allUsers = getAllUserService('Select * from users')
        res.status(200).send({ msg: 'OK', data: allUsers })
    } catch (error) {
        next(error)
    }
}

// Get a user by ID
export const getOneUserById = (req, res, next) => {
    try {
        const oneUser = getOneUserByIdService(
            'Select * from users where id=$1',
            req.params.id
        )
        res.status(200).send({ msg: 'OK', data: oneUser })
    } catch (error) {
        next(error)
    }
}

// Create a new user
export const createUser = (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            avatar,
            username,
            brith_of_date,
            phone_number,
        } = req.body
        const newUser = createUserService(
            'Insert into users (name, email, password, avatar, username, brith_of_date, phone_number) values ($1, $2, $3, $4, $5, $6, $7) returning *',
            [
                name,
                email,
                password,
                avatar,
                username,
                brith_of_date,
                phone_number,
            ]
        )

        res.status(200).send({ msg: 'OK', id: newUser.id })
    } catch (error) {
        next(error)
    }
}

// Update a user
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            name,
            email,
            password,
            avatar,
            username,
            brith_of_date, 
            phone_number,
        } = req.body;

        const userResult = await pool.query(
            'SELECT * FROM users WHERE email ILIKE $1 AND id <> $2',
            [email, id]
        );

        if (userResult.rows.length > 0) {
            return res.status(400).send({ message: "Bunday User email mavjud" });
        }

        const updatedUserResult = await pool.query(
            `
            UPDATE users
            SET name = $1, email = $2, password = $3, avatar = $4, username = $5, brith_of_date = $6, phone_number = $7
            WHERE id = $8
            RETURNING *
            `,
            [name, email, password, avatar, username, brith_of_date, phone_number, id]
        );

        if (updatedUserResult.rows.length === 0) {
            return res.status(404).send({ message: "Foydalanuvchi topilmadi" });
        }

        res.status(200).send({ msg: 'OK', updatedUser: updatedUserResult.rows[0] });
    } catch (error) {
        next(error);
    }
}

// Delete a user
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *', [id]
        );
        
        res.status(200).send({ msg: 'Ochirildi', deletedUser });
    } catch (error) {
        next(error);
    }
}
