import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import crudContext from "../../context/crud/crudContext";


const Contacts = () => {
  const CrudContext = useContext(crudContext);

  const { meetings, filtered, getMeetings, loading } = CrudContext;

  
     useEffect(() => {
      getMeetings();
      // eslint-disable-next-line
    }, []);
  
    if (meetings !== null && meetings.length === 0 && !loading) {
      return <h4>Please add a meeting</h4>;
    }

  return (
    <Fragment>
      {meetings !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(meeting => (
                <CSSTransition
                  key={meeting._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem meeting={meeting} />
                </CSSTransition>
              ))
            : meetings.map(meeting => (
                <CSSTransition
                  key={meeting._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem meeting={meeting} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;