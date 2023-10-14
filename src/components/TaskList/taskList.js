import React from "react";
import Task from "../Task/task";
import PropTypes from 'prop-types';



const TaskList = ({tasks, onDeleted, onToggleDone}) => {
    const elements = tasks.map((task) => {
        return (
          <Task task={task} 
            onDeleted = {onDeleted}
            onToggleDone = {onToggleDone}
            key={task.id}
            seconds={+task.inputMin * 60 + +task.inputSec} />
        );
      });
      
    return (
        <section className="main">
            <ul className="todo-list">
                {elements}
            </ul>
        </section>
        
    )
};

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            done: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
};

export default TaskList;


