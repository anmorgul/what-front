import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { CoursesTabs, GroupsTabs } from '@/screens/index.js';
import {
  Counter, ListOfStudents, NotFound,
  ListOfCourses, AddCourse, ListOfGroups,
  Auth,
} from '../index.js';

export const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" render={() => (<h1 className="m-3">Welcome to the WHAT project!</h1>)} />
      <Route exact path="/counter" component={Counter} />
      <Route exact path="/students" component={ListOfStudents} />
      <Route exact path="/courses" component={ListOfCourses} />
      <Route exact path="/courses/add-course" component={AddCourse} />
      <Route exact path="/courses/:id" component={() => <CoursesTabs index={0} />} />
      <Route exact path="/courses/edit/:id" component={() => <CoursesTabs index={1} />} />
      <Route exact path="/groups" component={ListOfGroups} />
      <Route exact path="/groups/:id" render={() => <GroupsTabs index={0} />} />
      <Route exact path="/groups/edit/:id" render={() => <GroupsTabs index={1} />} />
      <Route exact path="/404" component={NotFound} />
      <Route exact path="/auth" component={Auth} />
      <Redirect to="/404" />
    </Switch>
  </>
);
