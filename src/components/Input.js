import React, { useState } from "react";

function AddNewItem({ onNewItem, onCloseForm }) {
    const [newTask, setNewTask] = useState({
        name: "",
        description: "",
        timeDue: "",
        done: false,
    });

    // Function to handle input change and update corresponding state property
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setNewTask((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Function to format the time input into 12-hour format with AM/PM
    const formatTime = (time) => {
        const [hour, minute] = time.split(":");
        const hourInt = parseInt(hour, 10);
        const amPm = hourInt >= 12 ? "PM" : "AM";
        const formattedHour = hourInt % 12 || 12;
        return `${formattedHour}:${minute} ${amPm}`;
    };

    // Handle form submission: prevents page reload and passes new task data to parent
    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Ensure all fields are filled before submitting
        if (newTask.name && newTask.description && newTask.timeDue) {
            const formattedTimeDue = formatTime(newTask.timeDue);

            // Pass the new task data to the parent component
            onNewItem({ ...newTask, timeDue: formattedTimeDue });

            // Reset form fields after submission
            setNewTask({ name: "", description: "", timeDue: "", done: false });

            // Close the form
            onCloseForm();
        }
    };

    return (
        <div className="col-12">
            <h1>Add New Task</h1>
            <form onSubmit={handleFormSubmit} className="mb-4">
                {/* Task Name Input */}
                <div className="mb-3">
                    <label htmlFor="taskName" className="form-label">
                        Task Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="taskName"
                        name="name"
                        value={newTask.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Task Description Input */}
                <div className="mb-3">
                    <label htmlFor="taskDescription" className="form-label">
                        Task Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="taskDescription"
                        name="description"
                        value={newTask.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Task Due Time Input */}
                <div className="mb-3">
                    <label htmlFor="taskTimeDue" className="form-label">
                        Due Time
                    </label>
                    <input
                        type="time"
                        className="form-control"
                        id="taskTimeDue"
                        name="timeDue"
                        value={newTask.timeDue}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-success">
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default AddNewItem;
