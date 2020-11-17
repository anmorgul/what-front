import React from 'react';
import classNames from 'classnames';
import { shallowEqual, useSelector } from 'react-redux';
import { Card, Search, Button } from '../../components/index.js';
import { useActions } from '../../shared/hooks/index.js';
import { listOfGroupsActions, searchGroup, searchDate } from './redux/index.js';
import Icon from '../../icon.js';

import styles from './list-of-groups.scss';

// use it temporary
import { data } from './groups.js';

export const ListOfGroups = () => {
  const { setSearchGroupValue, inputGroupStartDate } = useActions(listOfGroupsActions);

  const searchGroupName = useSelector(searchGroup, shallowEqual);
  const searchStartDate = useSelector(searchDate, shallowEqual);

  const handleSearch = (inputValue) => {
    setSearchGroupValue(inputValue);
  };

  // Wait for Routing
  const handleAddGroup = () => {
    console.log('Redirect to add group form');
  };

  const handleCardEdit = (id) => {
    console.log(`Redirect to card editing ${id}`);
  };

  const handleCardDetails = (id) => {
    console.log(`Redirect to card details ${id}`);
  };

  const handleCalendarChange = (event) => {
    const date = event.target.value;
    inputGroupStartDate(date);
  };

  const setGroupList = () => {
    const listByName = data.filter((group) => group.name.toUpperCase().includes(searchGroupName.toUpperCase()));
    console.log('serach date'+searchStartDate);
    const listByDate = listByName.filter((group) => group.startDate.includes(searchStartDate));
    console.log(listByDate);
    const resultListOfGroups = listByDate.map((group) => {
      const resultDate = group.startDate.replaceAll('-', '.');
      return (
        <Card
          key={group.id}
          id={group.id}
          title={group.name}
          date={resultDate}
          button="Details"
          onEdit={handleCardEdit}
          onDetails={handleCardDetails}
        />
      );
    });

    return resultListOfGroups;
  };

  return (
    <div className="container">
      <div className="row">
        <div className={classNames(styles['list-head'], 'col-12')}>
          <input
            className={classNames('form-control ', styles['calendar-input'])}
            type="date"
            name="group_date"
            required
            onChange={handleCalendarChange}
            placeholder="year-month-day"
          />
          <Search onSearch={handleSearch} placeholder="Search group" className="col-4" />
          <Button onClick={handleAddGroup} variant="warning">
            <Icon icon="Plus" size={20} className="icon" />
            Add Group
          </Button>
        </div>
        <hr className="col-8" />
        <div className={classNames(styles['group-list'], 'col-12 d-flex flex-row flex-wrap justify-content-center')}>
          {
               setGroupList()
          }
        </div>
      </div>
    </div>
  );
};
