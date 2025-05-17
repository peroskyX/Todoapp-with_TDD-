export interface ITodo {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ITodoInput {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface TodoResponse extends ITodo {
  _id: string;
}
