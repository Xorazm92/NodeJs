import { createUser } from '../services/index.js'
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { readUsersDB } from '../services/db.js'
export const registerController = async (req, res, next) => {
  try {
    const user = await createUser(req.body)
    res.send(user)
  } catch (error) {
    next(error)
  }
}

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const users = await readUsersDB()
    const user = users.find(u => u.email === email)
    
    if (!user) {
      return res.status(400).send("User not found")
    }
    
    const isValidPassword = await compare(password, user.password)
    
    if (!isValidPassword) {
      return res.status(400).send("Invalid password")
    }
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.send({ token })
  } catch (error) {
    next(error)
  }
}

export const logoutController = (req, res, next) => {
  try {
    res.send({ message: "Logged out successfully" })
  } catch (error) {
    next(error)
  }
}