import TodoModel from '../models/todo.model';
import { ITodo, ITodoInput } from '../types/todo';

export const createTodo = async (todoData: ITodoInput): Promise<ITodo> => {
  return await TodoModel.create(todoData);
};

export const getTodoByID = async (id: string): Promise<ITodo | null> => {
  return await TodoModel.findById(id);
};

export const getAllTodos = async (): Promise<ITodo[]> => {
  return await TodoModel.find();
};

export const updateTodo = async (
  id: string,
  todoData: Partial<ITodoInput>
): Promise<ITodo | null> => {
  return await TodoModel.findByIdAndUpdate(id, todoData, { new: true });
};

export const deleteTodo = async (id: string): Promise<ITodo | null> => {
  return await TodoModel.findByIdAndDelete(id);
};
