import {useState,useEffect} from "react";
import { MdCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { RiDeleteBinLine } from "react-icons/ri";
import { v4 } from "uuid";
import './page.css';
import React from "react";

const Task = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    
    const getTasks = () => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
            return JSON.parse(storedTasks);
        } else {
            return [];
        }

    }

    useEffect(() => {
        const storedTasks = getTasks();
        setTasks(storedTasks);
    }, []);
    
    const addTask = () => {
        const newTask = {
            id: v4(),
            task: task,
            isChecked: false 
        };
        setTasks([...tasks, newTask]);
        setTask('');
        localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    };

    const removeTask = (id) => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
    const handleisChecked = (id) => {
        const newTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, isChecked: !task.isChecked }; // Toggle isChecked for the specific task
            }
            return task;
        });
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };
    return (
        <div className="container">
            <div className="box">
                <h1>Task Tracker</h1>
                <form onSubmit={(e) => { e.preventDefault(); addTask(); }} >
                    <div>
                        <input 
                            type="text"
                            placeholder="Add a new task"
                            className="input" 
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            required
                        />
                        <button className="btn" type="submit"> Add Task</button>
                    </div>
                </form>
                {tasks.length > 0 ? (
                    <ul className="task-list">
                        {tasks.map(task => (
                            <li key={task.id} className="task-item"> 
                                <button className="checkbox" onClick={() => handleisChecked(task.id)}>
                                    {task.isChecked ? <span className="checked"><MdCancel /></span> : <span className="unchecked"><SiTicktick/></span>}
                                </button>
                                <span className={`${task.isChecked? 'checked' : 'unchecked'} task-text`}>{task.task}</span>
                                <button className="remove-btn" onClick={() => removeTask(task.id)}>
                                <RiDeleteBinLine />
                                </button>
                            </li>  
                        ))}
                    </ul>
                ) : (
                    <p>No tasks available</p>
                )}
                <div></div>
            </div>
        </div>
    );
}

export default Task;