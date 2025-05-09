import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import TodoModel from '../todo.model';
import { TodoInput } from '../../types/todo';

describe('Todo Model', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should create a todo successfully', async () => {
    const todoData: TodoInput = {
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
    };

    const todo = await TodoModel.create(todoData);

    expect(todo).toHaveProperty('_id');
    expect(todo.title).toBe(todoData.title);
    expect(todo.description).toBe(todoData.description);
    expect(todo.completed).toBe(todoData.completed);
    expect(todo.createdAt).toBeInstanceOf(Date);
  });

  it('should fail validation if title is not provided', async () => {
    const invaliTodoData: TodoInput = {
      title: '',
      description: 'Missing title',
      completed: false,
    };

    try {
      await TodoModel.create(invaliTodoData);
      fail('Should have throw validation error');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
