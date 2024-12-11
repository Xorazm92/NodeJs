import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import * as fs from 'fs/promises';

@Injectable()
export class TodosService {
  private filePath = './todos.json';

  async create(createTodoDto: CreateTodoDto) {
    let todos = [];
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      todos = JSON.parse(data);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    const newTodo = { id: todos.length + 1, ...createTodoDto };
    todos.push(newTodo);

    await fs.writeFile(this.filePath, JSON.stringify(todos, null, 2));
    return newTodo;
  }

  async findAll() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  }

  async findOne(id: number) {
    const todos = await this.findAll();
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todos = await this.findAll();
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }

    todos[todoIndex] = { ...todos[todoIndex], ...updateTodoDto };
    await fs.writeFile(this.filePath, JSON.stringify(todos, null, 2));
    return todos[todoIndex];
  }

  async remove(id: number) {
    const todos = await this.findAll();
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    if (todos.length === updatedTodos.length) {
      throw new Error(`Todo with id ${id} not found`);
    }

    await fs.writeFile(this.filePath, JSON.stringify(updatedTodos, null, 2));
    return { message: `Todo with id ${id} has been removed` };
  }
}
