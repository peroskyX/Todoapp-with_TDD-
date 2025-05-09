import mongoose, { Schema, Document } from 'mongoose';
import { ITodo, TodoInput, TodoUpdate, TodoResponse } from '../types/todo';

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

type TodoDocument = ITodo & Document;

const TodoModel = mongoose.model<TodoDocument>('Todo', todoSchema);

export default TodoModel;
