import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DndProvider, useDrop} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Task from '../Task/Task';
import './TaskBoard.css';
import { TaskData } from '../types';
import TaskForm from '../Taskform/Taskform';

interface DragItem {
  id: string;
  type: 'task';
}

const TaskBoard: React.FC = () => {
  const [todos, setTodos] = useState<TaskData[]>([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const addNewTask = (newTask: TaskData) => {
  setTodos((prevTodos) => [newTask, ...prevTodos]);
  };



  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<TaskData[]>('/api/todos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTodos(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch todos.');
      }
    };
    fetchTodos();
  }, []);

  const handleDrop = async (taskId: string, isOverCompleted: boolean) => {
    const task = todos.find((t) => t._id === taskId);
    if (task) {
      const updatedTask = { ...task, isCompleted: isOverCompleted };
      const response = await axios.put<TaskData>(
        `/api/todos/${taskId}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const newTodos = todos.map((t) => (t._id === taskId ? response.data : t));
      setTodos(newTodos);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await axios.delete(`/api/todos/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const newTodos = todos.filter((task) => task._id !== taskId);
      setTodos(newTodos);
    } catch (error) {
      console.error(error);
      setError('Failed to delete task.');
    }
  };

  const handleCompleteClick = async (taskId: string) => {
    const task = todos.find((t) => t._id === taskId);
    if (task) {
      const updatedTask = { ...task, isCompleted: true };
      const response = await axios.put<TaskData>(
        `/api/todos/${taskId}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const newTodos = todos.map((t) => (t._id === taskId ? response.data : t));
      setTodos(newTodos);
    }
  };

  const handleEditClick = async (updatedTask: TaskData) => {
  try {
    const response = await axios.put<TaskData>(
      `/api/todos/${updatedTask._id}`,
      updatedTask,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const newTodos = todos.map((t) => (t._id === updatedTask._id ? response.data : t));
    setTodos(newTodos);
  } catch (error) {
    console.error(error);
    setError('Failed to update task.');
  }
};

  const completedTasks = todos.filter((task) => task.isCompleted);
  const todoTasks = todos.filter((task) => !task.isCompleted);

  return (
    <>
      <TaskForm addNewTask={addNewTask} />
      
        <div className="task-board">
          <div className="task-column">
            <h2 className="task-column-title">Todo</h2>
            <ul className="task-list">
              {error && <div className="error">{error}</div>}
              {todoTasks.map((task) => (
                <li key={task._id}>
                  <Task
                    task={task}
                    onDelete={handleDelete}
                    onComplete={handleCompleteClick}
                    onEdit={handleEditClick}
                    onDrop={handleDrop}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="task-column">
            <h2 className="task-column-title">Completed</h2>
            <ul className="task-list">
              {completedTasks.map((task) => (
                <li key={task._id}>
                  <Task
                    task={task}
                    onDelete={handleDelete}
                    onComplete={handleCompleteClick}
                    onEdit={handleEditClick}
                    onDrop={handleDrop}
                    />
                </li>
              ))}
            </ul>
          </div>
        </div>
    </> 
  );
};

export default TaskBoard;


