import React from 'react';

import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            taskText: '',
            inputMin: '',
            inputSec: ''
        }
    }
    static propTypes = {
        tasks: PropTypes.arrayOf(
            PropTypes.shape({
                done: PropTypes.bool.isRequired,
            })
        ).isRequired,
        onDeleted: PropTypes.func.isRequired,
        addTask: PropTypes.func.isRequired,
        onToggleDone: PropTypes.func.isRequired,
    }

    handleInputChange = (event) =>{
        const {name, value} = event.target;
        this.setState({
            [name]: isNaN(value) ? value : value 

        })
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        console.log('тут');
        const {taskText,  inputMin, inputSec} = this.state;
        if (taskText.trim() !== ''){
            this.props.addTask(taskText, inputMin, inputSec);
            this.setState({
                taskText: '',
                inputMin: '',
                inputSec: ''
            })
        }
    }
    render(){

        const { taskText, inputMin, inputSec } = this.state;
        
        return(
            <form onSubmit={this.handleSubmit} className='new-todo-form'>
                <input
                    name='taskText'
                    className="new-todo" 
                    placeholder="What needs to be done?" 
                    autoFocus
                    value={taskText}
                    onChange={this.handleInputChange}
                     />
                <input 
                    name='inputMin'
                    className="new-todo-form__timer" 
                    placeholder="Min"
                    onChange={this.handleInputChange}
                    value={(inputMin >= 0) ?  inputMin : 0}
                    required
                    type="number"  />
                <input 
                    name='inputSec'
                    className="new-todo-form__timer" 
                    placeholder="Sec"
                    onChange={this.handleInputChange}
                    value={(inputSec >= 0) ?  inputSec : 0}
                    required
                    type="number"  /> 
                <input type="submit" hidden/>
            </form>
        )
    }
}


export default NewTaskForm;