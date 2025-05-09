import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {
  createTodo,
  getTodoByID,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from '../todo.service';
import TodoModel from '../../models/todo.model';
import { TodoInput } from '../../types/todo';

describe('Todo Service', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await TodoModel.deleteMany({});
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const todoData = {
        title: 'New Todo',
        description: 'New description',
      };

      const todo = await createTodo(todoData);

      expect(todo).toHaveProperty('_id');
      expect(todo.title).toBe(todoData.title);
      expect(todo.description).toBe(todoData.description);
      expect(todo.completed).toBe(false);
    });
  });
  describe('getTodoById', () => {
    it('should return todo by id', async () => {
      const todoData = {
        title: 'Get Todo',
        description: 'Get description',
        completed: false,
      };
      const createTodo = await TodoModel.create(todoData);
      const todo = await getTodoByID(createTodo._id.toString());
      expect(todo).toBeDefined();
      expect(todo?.title).toBe(todoData.title);
    });
    it('should return null for non-existent todo id', async () => {
      const nonExistedId = new mongoose.Types.ObjectId().toString();
      const todo = await getTodoByID(nonExistedId);
      expect(todo).toBeNull();
    });
  });
  describe('getAllTodos', () => {
    it('should return all todos', async () => {
      const todoData1 = {
        title: 'Todo 1',
        description: 'Description 1',
        completed: false,
      };
      const todoData2 = {
        title: 'Todo 2',
        description: 'Description 2',
        completed: true,
      };
      await TodoModel.create(todoData1);
      await TodoModel.create(todoData2);
      const todos = await getAllTodos();
      expect(todos.length).toBe(2);
      expect(todos[0].title).toBe(todoData1.title);
      expect(todos[1].title).toBe(todoData2.title);
    });
  });
  describe('updateTodo', () => {
    it('should update a todo', async () => {
      const todoData = {
        title: 'Update Todo',
        description: 'Update description',
        completed: false,
      };
      const createTodo = await TodoModel.create(todoData);
      const updatedData = {
        title: 'Updated Todo',
        description: 'Updated description',
        completed: true,
      };
      const updatedTodo = await updateTodo(
        createTodo?._id.toString(),
        updatedData
      );
      expect(updateTodo).toBeDefined();
      expect(updatedTodo?.title).toBe(updatedData.title);
      expect(updatedTodo?.description).toBe(updatedData.description);
      expect(updatedTodo?.completed).toBe(true);
      const todo = await TodoModel.findById(createTodo._id);
      expect(todo?.title).toBe(updatedData.title);
    });
  });
  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      const todoData1 = {
        title: 'Delete Todo1',
        description: 'Delete description2',
        completed: false,
      };
      const todoData2 = {
        title: 'Delete Todo 2',
        description: 'Delete description2',
        completed: true,
      };
      const createTodo1 = await TodoModel.create(todoData1);
      const createTodo2 = await TodoModel.create(todoData2);
      await deleteTodo(createTodo1._id.toString());
      const todos = await TodoModel.find();
      expect(todos.length).toBe(1);
      expect(todos[0].title).toBe(todoData2.title);
    });
    it('should return null for non-existent todo id', async () => {
      const nonExistedId = new mongoose.Types.ObjectId().toString();
      const todo = await deleteTodo(nonExistedId);
      expect(todo).toBeNull();
    });
  });
});
