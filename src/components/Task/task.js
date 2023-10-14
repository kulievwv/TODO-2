import React from "react";
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends React.Component {
  static propTypes = {
    task: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      done: PropTypes.bool.isRequired,
    }).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
  };

  state = {
    timeDistance: formatDistanceToNow(this.props.task.id),
    isPlaying: false,
    timerSeconds: +this.props.seconds
  }


  componentDidMount(){
    this.interval = setInterval ( () =>{
      const timeDistance = formatDistanceToNow(this.props.task.id)
      this.setState ({
        timeDistance: timeDistance
      })
    }, 1000 )
  }
  componentWillUnmount(){
    clearInterval(this.interval);
    clearInterval(this.timerInterval);
  }
  timerPlay(){
    if(!this.state.isPlaying){

      this.setState({isPlaying: true});
      this.timerInterval = setInterval( () =>{
        if(this.state.timerSeconds > 0)
        this.setState({
          timerSeconds: this.state.timerSeconds - 1
        })
        
      }, 1000 )
    }
  }
  timerStop(){
    if(this.state.isPlaying){
      this.setState({isPlaying: false});
      clearInterval(this.timerInterval);
    }
  }

  render() {
    const { task, onDeleted, onToggleDone } = this.props;
    const {timerSeconds} = this.state;
    let classNames = task.done ? 'completed' : '';

    return (
      <li className={classNames} >
        <div className="view" 
              onClick={(event) => {
                onToggleDone(task.id, event)}}>
          <input
            className="toggle"
            type="checkbox"
            checked={task.done}
          />
          <label>
            <span className="title" 
                  >{task.task} 
            </span>
             <button 
              className="icon icon-play" 
              data-ignore="true"
              onClick={ () => this.timerPlay()}></button>
            <button 
              className="icon icon-pause"
              data-ignore="true" 
              onClick={ () => this.timerStop()}></button>
               <span className="description">
                {Math.floor(+timerSeconds / 60)}:{+timerSeconds % 60}
              </span>
            <span className="description" >created {this.state.timeDistance} ago</span>
          </label>
        </div>

        <button className="icon icon-edit"
                data-ignore="true">
                </button>
        <button className="icon icon-destroy" onClick={() => onDeleted(task.id)}></button>
      </li>
    );
  }
}
