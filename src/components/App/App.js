import React from 'react';
import NewTaskForm from '../NewTaskForm/newTaskForm';
import TaskList from '../TaskList/taskList';
import Footer from '../Footer/footer';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tasks: [],
      filter: 'all' 
    }
  }
  showAll = () =>{
    this.setState( ({filter}) => {
      return{
        filter: 'all'
      }
    } )
    
  }
  showCompleted = () =>{
    this.setState( ({filter}) => {
      return{
        filter: 'completed'
      }
    } )
  }
  showActive = () =>{
    this.setState( ({filter}) => {
      return{
        filter: 'active'
      }
    } )
    
  }
  clearCompleted = () => {
    this.setState ( ({tasks}) => {
      const newTasksList = tasks.filter( (task) => !task.done);
      return {
        tasks: newTasksList
      }
    })
  }
  onDeleted = (id) => {
    this.setState( ({tasks}) => {
      const newTasks = tasks.filter((task) => task.id !== id);
      return {
        tasks: newTasks
      }
    })
  };
  addTask = (taskText,  inputMin, inputSec) => {
    const newTask = {
      id: Date.now(),
      task: taskText,
      done: false,
      inputMin: +inputMin,
      inputSec: +inputSec
    };
    this.setState((prevState) => {
      const newTasks = [...prevState.tasks, newTask];
      return { tasks: newTasks };
    });
  };
  onToggleDone = (id, event) => {
    if(event.target.dataset.ignore === 'true'){
      return
    }
      this.setState(({ tasks }) => {
        const updatedTasks = tasks.map(task => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done
            };
          }
          return task;
        });
        return { tasks: updatedTasks };
      });
    
  };

    render(){
      return (
      <section className="todoapp">
        <header className='header'>
          <h1> Todos </h1>
          
        <NewTaskForm addTask={this.addTask} />
        </header>
        <main>
        <TaskList tasks={this.state.tasks.filter( (task) => {
              switch(this.state.filter){
                case 'all': return true;
                case 'active' : return !task.done;
                case 'completed' : return task.done;
                default: return true;
              }
            })}  onDeleted={this.onDeleted} onToggleDone={this.onToggleDone} />
        </main>
        <Footer completedCount={this.state.tasks.filter(task => !task.done).length}
                filter={this.state.filter}
                showAll={this.showAll}
                showActive={this.showActive}
                showCompleted={this.showCompleted}
                clearCompleted={this.clearCompleted}
                />
      </section>
    );
  }
}




