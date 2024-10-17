import { readUsersDB, writeUsersDB } from '../services/db.js'

export const getProfile = async (req, res, next) => {
  try {
    const users = await readUsersDB()
    const user = users.find(u => u.id === req.params.id)
    if (!user) {
      return res.status(404).send("User not found")
    }
    delete user.password
    res.send(user)
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
    try {
      const users = await readUsersDB()
      const userIndex = users.findIndex(u => u.id === req.params.id)
      if (userIndex === -1) {
        return res.status(404).send("User not found")
      }
      users[userIndex] = { ...users[userIndex], ...req.body }
      await writeUsersDB(users)
      delete users[userIndex].password
      res.send(users[userIndex])
    } catch (error) {
      next(error)
    }
  }
  
  export const deleteProfile = async (req, res, next) => {
    try {
      const users = await readUsersDB()
      const updatedUsers = users.filter(u => u.id !== req.params.id)
      if (users.length === updatedUsers.length) {
        return res.status(404).send("User not found")
      }
      await writeUsersDB(updatedUsers)
      res.send({ message: "User deleted successfully" })
    } catch (error) {
      next(error)
    }
  }
  