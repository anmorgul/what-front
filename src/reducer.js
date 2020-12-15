import { combineReducers } from 'redux';
import { counterReducer, listOfGroupsReducer, alertReducer } from './features/index.js';
import {
  mentorsModelReducer, themesReducer, coursesReducer,
  schedulesReducer, studentsReducer, lessonsReducer,
  accountReducer, secretariesReducer, studentGroupsReducer,
} from './models/index.js';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
    listOfGroups: listOfGroupsReducer,
    alert: alertReducer,
  }),
  models: combineReducers({
    users: accountReducer,
    courses: coursesReducer,
    lessons: lessonsReducer,
    students: studentsReducer,
    mentors: mentorsModelReducer,
    schedules: schedulesReducer,
    themes: themesReducer,
    secretaries: secretariesReducer,
    studentGroups: studentGroupsReducer,
  }),
});
