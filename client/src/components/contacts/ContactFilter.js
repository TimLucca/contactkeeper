import React, {useContext} from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
  const {filterContacts, clearFilter} = useContext(ContactContext)

  return (
    <form>
      <input 
        name='filter'
        type="text" 
        placeholder="Search..." 
        onChange={e => {
          if(e.target.value) 
            filterContacts(e.target.value)
          else 
            clearFilter()
        }}
      />
    </form>
  )
}

export default ContactFilter
