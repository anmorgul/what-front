import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store.js';
import { Counter, ListOfGroups } from './features/index.js';
import Icon from './icon.js';
import { ListOfStudents } from './features/index.js';
import { ListOfMentors } from './features/index.js';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <h1>Hello, I`m App Component!</h1>
    <Counter />
    <Icon icon="Plus" size={32} className="icon" color="#FFB800" />
    <Icon icon="Edit" viewBox="0 0 50 50" color="#FFB800" />

    <ListOfMentors />
  </Provider>
);