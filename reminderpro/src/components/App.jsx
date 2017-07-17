import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder ,clearReminders} from '../actions';
import moment from 'moment';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      text : '',
      dueDate : ''
    }
  }

  addReminder(){
  this.props.addReminder(this.state.text,this.state.dueDate);
  }

  deleteReminder(id){
    this.props.deleteReminder(id);
  }

  renderReminders(){
    const { reminders } = this.props;
    return(
      <ul className="list-group col-sm-6">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item">
                <div>
                  <span>{reminder.text}</span>
                  <span className="remove-icon" onClick={() => this.deleteReminder(reminder.id)}>&#x2715;</span>
                </div>
                <span><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></span>

              </li>
            )
          })
        }
      </ul>
    )
  }

  render(){
    return(
      <div className="app">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline">
          <div className="form-group">
              <input type="text"
                className="form-control"
                placeholder="I need to..."
                onChange={event => this.setState({text : event.target.value})}
                />
              <input type="datetime-local"
                className="form-control"
                onChange={event => this.setState({dueDate : event.target.value})}
                />
          </div>
          <button className="btn btn-success" onClick={() => this.addReminder()}>
            Add Reminder
          </button>
          <button className="btn btn-danger" onClick={() => this.props.clearReminders()}>
            Clear Reminders
          </button>
        </div>
        {this.renderReminders()}
      </div>
    )
  }
}

function mapStateToProps(state){
return{
  reminders: state
  }
}

export default connect (mapStateToProps,{addReminder,deleteReminder,clearReminders})(App);
