import React, {Fragment, useContext, useEffect} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'

const Contacts = () => {
  const {contacts, filtered, getContacts, loading} = useContext(ContactContext)

  useEffect(() => {
    getContacts()
    // eslint-disable-next-line
  }, [])

  if(contacts !== null && contacts.length === 0) 
    return (
      <TransitionGroup>
        <CSSTransition key='0' timeout={500} classNames='item'>
          <h4>Please add a contact</h4>
        </CSSTransition>
      </TransitionGroup>
    )
  return (
    <Fragment>
      {contacts != null && !loading ? (
      <TransitionGroup>
        {filtered.length > 0 
          ? filtered.map(contact => (
            <CSSTransition key={contact._id} timeout={500} classNames='item'>
              <ContactItem  contact={contact} />
            </CSSTransition>
          ))
          : contacts.map(contact => (
            <CSSTransition key={contact._id} timeout={500} classNames='item'>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))
        }  
      </TransitionGroup>) : <Spinner />}
    </Fragment>
  )
}

export default Contacts
