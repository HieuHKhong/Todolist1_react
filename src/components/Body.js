import React, { useState } from 'react'; // Importing React and useState for state management
import tasksData from '../toDoListData'; // Importing initial tasks list
import Input from './Input'; // Importing Input component for adding new tasks
import '../style.css'; // Importing CSS for styling

function TaskList() {
    const [tasks, setTasks] = useState(tasksData); // State to track the tasks list
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    // Toggle a task's 'done' status
    const toggleTaskDone = (index) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks]; // Copy current tasks array
            updatedTasks[index] = { 
                ...updatedTasks[index], 
                done: !updatedTasks[index].done // Toggle the 'done' status of the task
            };
            return updatedTasks; // Return updated tasks array
        });
    };

    // Add a new task to the list
    const handleAddTask = (task) => {
        setTasks((prevTasks) => [...prevTasks, task]); // Add new task to the end of the list
    };

    // Delete a task by its index
    const handleDeleteTask = (index) => {
        setTasks((prevTasks) => prevTasks.filter((task, i) => i !== index)); // Remove task from list
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">To Do List</h1>

            {/* Toggle the visibility of the input form */}
            <button 
                className="btn btn-primary mb-3" 
                onClick={() => setShowForm((prevState) => !prevState)}
            >
                {showForm ? 'Show Task List' : 'Add New Task'}
            </button>

            {/* Conditional rendering based on showForm state */}
            {showForm ? (
                <Input onNewItem={handleAddTask} onCloseForm={() => setShowForm(false)} />
            ) : (
                <div className="row">
                    {/* Map through tasks and display them */}
                    {tasks.map((task, index) => (
                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                            <div className={`task-item p-3 border rounded ${task.done ? 'bg-info' : ''}`}>
                                {/* Checkbox to toggle 'done' status */}
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={task.done}
                                        onChange={() => toggleTaskDone(index)} // Toggle task completion
                                        id={`task-checkbox-${index}`}
                                    />
                                    <label className="form-check-label" htmlFor={`task-checkbox-${index}`}>
                                        <h4 className={`task-name ${task.done ? 'text-decoration-line-through' : ''}`}>
                                            {task.name}
                                        </h4>
                                    </label>
                                </div>

                                {/* Task Description */}
                                <p className={`task-description ${task.done ? 'text-decoration-line-through' : ''}`}>
                                    {task.description}
                                </p>
                                
                                {/* Due Time */}
                                <p className={`task-time ${task.done ? 'text-decoration-line-through' : ''}`}>
                                    <strong>Due Time:</strong> {task.timeDue}
                                </p>

                                {/* Status */}
                                <p className="task-status">
                                    <strong>Status:</strong> {task.done ? "Completed" : "Pending"}
                                </p>

                                {/* Button to delete task */}
                                <button 
                                    className="btn btn-danger btn-sm delete-btn mt-2" 
                                    onClick={() => handleDeleteTask(index)}
                                >
                                    Delete Task
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaskList;
