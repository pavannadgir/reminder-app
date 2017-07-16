import {ADD_REMINDER,DELETE_REMINDER,CLEAR_REMINDERS} from '../constants';
import {bake_cookie,read_cookie} from 'sfcookies';

const reminder = (action) => {
  let {text,dueDate} = action;
  return{
    text,
    dueDate,
    id: Math.random()
  }
}

const removeReminderById = (state=[],id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
  return reminders;
}

const reminders = (state = [], action) => {
  let reminders = null;
  state = read_cookie("reminders");
  switch (action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      bake_cookie("reminders",reminders);
      console.log("state reducer",...state)
      return reminders;

    case DELETE_REMINDER:
      reminders = removeReminderById(state,action.id);
      bake_cookie("reminders",reminders);
      return reminders;

    case CLEAR_REMINDERS:
      reminders = [];
      bake_cookie("reminders",reminders);

    default:
    return state;
  }
}

export default reminders;
