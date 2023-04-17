import React, { useState } from 'react';
import './Task.css';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { TaskData } from '../types';
import './TaskModal.css';
import { faEdit, faTrashAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const API_URL = process.env.REACT_APP_API_URL;

interface DragItem {
  id: string;
  type: 'task';
  isCompleted: boolean;
}


interface TaskProps {
  task: TaskData;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
  onEdit: (updatedTask: TaskData) => void;
  onDrop: (taskId: string, isCompleted: boolean) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onComplete,  onEdit, onDrop }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  const [{ isDragging }, drag] = useDrag<DragItem, unknown, { isDragging: boolean }>({
    type: 'task',
    item: () => ({ id: task._id, type: 'task', isCompleted: task.isCompleted }),
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver: isOverTodo }, todoDrop] = useDrop({
    accept: 'task',
    drop: (item: any) => {
      handleDrop(item.id, false);
    },
    canDrop: () => true,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isOver: isOverCompleted }, completedDrop] = useDrop({
    accept: 'task',
    drop: (item: any) => {
      handleDrop(item.id, true);
    },
    canDrop: () => true,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
const handleDrop = (taskId: string, isCompleted: boolean) => {
  onDrop(taskId, isCompleted);
};


  const handleDeleteClick = () => {
    onDelete(task._id);
  };

  const handleCompleteClick = () => {
    onComplete(task._id);
  };

  const handleEditClick = () => {
    setShowModal(true);
    onEdit(task);
    
  };
 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit({ ...task, name, description });
    setShowModal(false);
  };

  return (
 <div
      ref={(el) => {
        drag(el);
        if (!task.isCompleted) {
          todoDrop(el);
        } else {
          completedDrop(el);
        }
      }}
      className={`task ${isDragging ? 'dragging' : ''} ${task.isCompleted ? 'completed' : ''}`}
    >
    <div className="task-card">
      <h3 className="task-name">{task.name}</h3>
      <p className="task-description">{task.description}</p>
      <div className="task-actions">
          <button className="task-action-btn" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} style={{ color: "#007bff" }} />
          </button>
          <button className="task-action-btn" onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrashAlt} style={{ color: "#007bff" }} />
          </button>
          {!task.isCompleted && (
            <button className="task-action-btn" onClick={handleCompleteClick}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#007bff" }} />
            </button>
          )}
      </div>
      {showModal && (
        <div className="modal">
          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              ></input>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default Task;
