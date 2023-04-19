import React, { useContext, useState } from 'react';
import './Taskform.css';
import axios from 'axios';
import { TaskData } from '../types';
import Spinner from '../Spinner/Spinner';
import { UserContext } from '../../Context/UserContext';
const API_URL = 'https://todo-backend-shubham-991.onrender.com';


interface TaskFormProps {
  addNewTask: (newTask: TaskData) => void;
}

const Taskform: React.FC<TaskFormProps> = ({ addNewTask }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/todos`, {
        name,
        description
      }, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      if (response.data) {
        setName('');
        setDescription('');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
        addNewTask(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="task-form-container">
      <h2>Create a new task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-control"
        ></input>
        <button type="submit" className="submit-btn">
          {isLoading ? <Spinner /> : 'Create Task'}
        </button>
        {showPopup && <div className="popup">Task created successfully!</div>}
      </form>
    </div>
  );
};

export default Taskform;
