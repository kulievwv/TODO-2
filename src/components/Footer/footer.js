import React from 'react';

export default class Footer extends React.Component {
    render(){
        return(
            <footer className="footer">
            <span className="todo-count">{this.props.completedCount}  items left</span>
            <ul className="filters">
              <li>
                <button className={this.props.filter === 'all' ? 'selected' : '' } onClick={this.props.showAll}>All</button>
              </li>
              <li>
                <button className={this.props.filter === 'active' ? 'selected' : '' } onClick={this.props.showActive}>Active</button>
              </li>
              <li>
                <button className = {this.props.filter === 'completed' ? 'selected' : '' } onClick={this.props.showCompleted}>Completed</button>
              </li>
            </ul>
            <button className="clear-completed" onClick={this.props.clearCompleted}>Clear completed</button>
          </footer>
        )
    }
}