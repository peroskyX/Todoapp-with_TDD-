import { Request, Response } from 'express';
import * as todoService from '../../services/todo.service';
import { createTodoHandler } from '../todo.controller';
import { TodoInput } from '../../types/todo';

// Mock the todoService
jest.mock('../../services/todo.service');
const mockedTodoService = todoService as jest.Mocked<typeof todoService>;

describe('Todo Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createTodoHandler', () => {
    it('should return a new todo', async () => {
      const todoData: TodoInput = {
        title: 'Test Todo',
        description: 'Test Description',
      };

      const createdTodo = {
        _id: '123',
        ...todoData,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRequest.body = todoData;
      mockedTodoService.createTodo.mockResolvedValue(createdTodo);

      await createTodoHandler(mockRequest as Request, mockResponse as Response);

      expect(mockedTodoService.createTodo).toHaveBeenCalledWith(todoData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdTodo);
    });
  });
});
