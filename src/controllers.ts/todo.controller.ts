import { Request, Response } from 'express';
import { createTodo, getTodoByID } from '../services/todo.service';
import { ITodoInput } from '../types/todo';

export const createTodoHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const todoData: ITodoInput = req.body;
  try {
    const newTodo = await createTodo(todoData);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

export const getTodoByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const todo = await getTodoByID(id);
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get todo' });
  }
};
