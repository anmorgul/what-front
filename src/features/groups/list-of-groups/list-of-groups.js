import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths } from '@/shared';
import { listOfGroupsActions, searchGroup, searchDate } from './redux/index.js';
import { useActions } from '@shared/hooks/index.js';
import { Button, Search, WithLoading, Card, Pagination } from '@components/index.js';
import { globalLoadStudentGroups, loadStudentGroupsSelector } from '@models/index.js';
import classNames from 'classnames';
import styles from './list-of-groups.scss';
import Icon from '@/icon.js';
import {icons} from "react-icons";

const editIcon = (
    <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" className={classNames("bi bi-pencil", styles.scale)} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
      <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
    </svg>
);

const icon1 = (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-layout-text-sidebar" viewBox="0 0 16 16">
      <path d="M3.5 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM3 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm12-1v14h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 0H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9V1z"/>
    </svg>
);

const icon2 = (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
    </svg>
);


export const ListOfGroups = () => {
  const history = useHistory();

  const studentGroupsState = useSelector(loadStudentGroupsSelector, shallowEqual);
  const { data: groups, isLoading, isLoaded, error } = studentGroupsState;

  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(12);

  const [visibleGroups, setVisibleGroups] = useState([]);

  const { setSearchGroupValue, inputGroupStartDate } = useActions(listOfGroupsActions);
  const searchGroupName = useSelector(searchGroup, shallowEqual);
  const searchStartDate = useSelector(searchDate, shallowEqual);

  const [fetchListOfGroups] = useActions([globalLoadStudentGroups]);

  useEffect(() => {
    fetchListOfGroups();
  }, [fetchListOfGroups]);

  const handleAddGroup = useCallback(() => {
    history.push(paths.GROUP_ADD);
  }, [history]);

  const handleSearch = useCallback((inputValue) => {
    setSearchGroupValue(inputValue);
  }, [setSearchGroupValue]);

  const handleCardEdit = useCallback((id) => {
    history.push(`${paths.GROUP_EDIT}/${id}`);
  }, [history]);

  const handleCardDetails = useCallback((id) => {
    history.push(`${paths.GROUPS_DETAILS}/${id}`);
  }, [history]);

  const handleCalendarChange = (event) => {
    const date = event.target.value;
    inputGroupStartDate(date);
  };

  const listByName = groups.filter((group) => {
    const normalizedName = group.name.toUpperCase();
    return normalizedName.includes(searchGroupName.toUpperCase());
  });

  const listByDate = listByName.filter((group) => group.startDate.includes(searchStartDate));

  const getGroupList = () => {
    const indexOfLastGroup = currentPage * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;

    const groupList = listByDate.slice(indexOfFirstGroup, indexOfLastGroup)
      .sort((a, b) => {
        return a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0;
      })
        .map((group, index) => {
          return (
            <tr  className={styles['table-item']} onClick={() => handleCardDetails(group.id)} key={group.id}>
              <td>{index+1}</td>
              <td>{group.name}</td>
              <td>{group.studentIds.length}</td>
              <td>{group.startDate.replaceAll('-', '.').slice(0, 10).split('.').reverse().join('.')}</td>
              <td onClick={() => handleCardEdit(group.id)}>{editIcon}</td>
            </tr>
        )});
      // .map((group) => (
      //   // <Card
      //   //   key={group.id}
      //   //   id={group.id}
      //   //   title={group.name}
      //   //   date={group.startDate.replaceAll('-', '.').slice(0, 10).split('.').reverse().join('.')}
      //   //   buttonName="Details"
      //   //   iconName="Edit"
      //   //   onEdit={() => handleCardEdit(group.id)}
      //   //   onDetails={() => handleCardDetails(group.id)}
      //   // />
      //
      //
      // ));

      if (!groupList.length && searchGroupName || searchStartDate) {
        return <h4>Group is not found</h4>;
      } if (!groupList.length && searchGroupName || searchStartDate) {
        return <h4>Group is not found</h4>;
      }

      return groupList;
    };

  const paginate = (pageNumber) => {
    if(currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(listByDate.length / 12);
    setCurrentPage((prev) => {
      if (prev === totalPages) {
        return prev;
      } else {
        return pageNumber;
      }
    });
  };

  const prevPage =(pageNumber) => {
    setCurrentPage((prev) => {
      if (prev - 1 === 0) {
        return prev;
      } else {
        return pageNumber;
      }
    });
  };

  return (
    <div className={classNames("container", styles['list-wrapper'])}>
      <div className="row d-flex justify-content-between align-items-center mb-3">
        <div className="col-6">
          <h1>Groups</h1>
        </div>
        <div className="col-4 d-flex align-items-center justify-content-end">

            {listByDate.length > 12 && !isLoading &&
            <Pagination
                itemsPerPage={groupsPerPage}
                totalItems={listByDate.length}
                paginate={paginate}
                prevPage={prevPage}
                nextPage={nextPage}
            />
            }

        </div>
      </div>
      <div className={classNames(styles['body-wrapper'], 'shadow p-3')}>
      <div className="row d-flex justify-content-between">

        <div className="col-2">
          <button className="btn">{icon1}</button>
          <button className="btn">{icon2}</button>
        </div>
        <div className="col-3  pl-3">
          <Search onSearch={handleSearch} placeholder="Group's name" />
        </div>
        <div className="col-2 text-center">
          <input
            className={classNames('form-control ', styles['calendar-input'])}
            type="date"
            name="group_date"
            required
            onChange={handleCalendarChange}
            placeholder="year-month-day"
          />
        </div>

        {/*<div className="custom-control custom-switch col-md-2  d-flex align-items-center">*/}
        {/*  <input type="checkbox" className="custom-control-input" id="customSwitch1"/>*/}
        {/*  <label className="custom-control-label" htmlFor="customSwitch1">Disabled Students</label>*/}
        {/*</div>*/}
          <div className="col-2 d-flex justify-content-end">
            <Button onClick={handleAddGroup} className={styles['btn-add']}>
              <Icon icon="Plus" className="icon" />
                Add a group
            </Button>
          </div>
        </div>
        <div>
          <hr className="col-8" />
          <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
            <WithLoading isLoading={isLoading}>
            <table className="table">
              <thead>
              <tr>
                <th scope="col">№</th>
                <th scope="col">Group name</th>
                <th scope="col">Quantity of students</th>
                <th scope="col">Date of start</th>
                <th scope="col">Edit</th>
              </tr>
              </thead>


              <tbody>
              {getGroupList()}
              </tbody>

            </table>
            </WithLoading>
          </div>
        </div>
      {/*{listByDate.length > 12 && !isLoading &&*/}
      {/*  <Pagination*/}
      {/*    itemsPerPage={groupsPerPage}*/}
      {/*    totalItems={listByDate.length}*/}
      {/*    paginate={paginate}*/}
      {/*    prevPage={prevPage}*/}
      {/*    nextPage={nextPage}*/}
      {/*  />*/}
      {/*}*/}
      </div>
    </div>
  );
};