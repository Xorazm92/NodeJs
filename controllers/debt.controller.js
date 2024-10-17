import { v4 as uuidv4 } from 'uuid'

let debts = []

export const getDebts = (req, res) => {
  res.json(debts)
}

export const createDebt = (req, res) => {
  const newDebt = { id: uuidv4(), ...req.body }
  debts.push(newDebt)
  res.status(201).json(newDebt)
}

export const getDebt = (req, res) => {
  const debt = debts.find(d => d.id === req.params.id)
  if (!debt) return res.status(404).send("Debt not found")
  res.json(debt)
}

export const updateDebt = (req, res) => {
  const index = debts.findIndex(d => d.id === req.params.id)
  if (index === -1) return res.status(404).send("Debt not found")
  debts[index] = { ...debts[index], ...req.body }
  res.json(debts[index])
}

export const deleteDebt = (req, res) => {
  const index = debts.findIndex(d => d.id === req.params.id)
  if (index === -1) return res.status(404).send("Debt not found")
  debts.splice(index, 1)
  res.status(204).send()
}