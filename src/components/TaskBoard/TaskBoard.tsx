  import React, { useEffect, useState, useContext } from 'react';
  import axios from 'axios';
  import {useDrop} from 'react-dnd';
  import Task from '../Task/Task';
  import './TaskBoard.css';
  import { TaskData } from '../types';
  import TaskForm from '../Taskform/Taskform';
  import { UserContext } from '../../Context/UserContext';
  const API_URL = 'https://todo-backend-shubham-991.onrender.com';


  interface DragItem {
    id: string;
    type: 'task';
  }

  const TaskBoard: React.FC = () => {
    const [todos, setTodos] = useState<TaskData[]>([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const {user} = useContext(UserContext);

    const addNewTask = (newTask: TaskData) => {
    setTodos((prevTodos) => [newTask, ...prevTodos]);
    };

    const fetchTodos = async () => {
      if(user && user.token){
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          
          const response = await axios.get<TaskData[]>(`${API_URL}/api/todos`, config);
          setTodos(response.data);
        } catch (error) {
          console.error(error);
          setError('Failed to fetch todos.');
        }
      }
      };

      useEffect(() => {
        if (user && user.token) {
          fetchTodos();
        }
      }, [user?.token]);


    const handleDrop = async (taskId: string, targetColumn: 'todo' | 'completed') => {
      const task = todos.find((t) => t._id === taskId);
      if (task) {
        const updatedTask = { ...task, isCompleted: targetColumn === 'completed' };
        const response = await axios.put<TaskData>(
          `${API_URL}/api/todos/${taskId}`,
          updatedTask,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
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
        await axios.delete(`${API_URL}/api/todos/${taskId}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
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
          `${API_URL}/api/todos/${taskId}`,
          updatedTask,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
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
        `${API_URL}/api/todos/${updatedTask._id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
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

  const [{ isOver: isOverTodo }, todoDrop] = useDrop({
      accept: 'task',
      drop: (item: DragItem) => {
        handleDrop(item.id, 'todo');
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    const [{ isOver: isOverCompleted }, completedDrop] = useDrop({
      accept: 'task',
      drop: (item: DragItem) => {
        handleDrop(item.id, 'completed');
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    const completedTasks = todos.filter((task) => task.isCompleted);
    const todoTasks = todos.filter((task) => !task.isCompleted);

    return (
      <>
        <TaskForm addNewTask={addNewTask} />
        
          <div className="task-board">
          <div ref={todoDrop} className={`task-column ${isOverTodo ? 'over' : ''}`}>  
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

            <div ref={completedDrop} className={`task-column ${isOverCompleted ? 'over' : ''}`}>
            
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


