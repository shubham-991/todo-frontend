  // src/components/Todo/Todo.tsx
  import React from 'react';
  import Navbar from '../Navbar/Navbar';
  // import Task from '../Task/Task';
  import './Todo.css';
  import TaskBoard from '../TaskBoard/TaskBoard';
  import { DndProvider } from 'react-dnd';
  import { HTML5Backend } from 'react-dnd-html5-backend';

  const Todo: React.FC = () => {
    return (
      <div className="todo">
        <Navbar />
        <DndProvider backend={HTML5Backend}>
          <TaskBoard />
        </DndProvider>
        
      </div>
    );
  };

  export default Todo;
