import { useState, useEffect } from 'react';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { add, remove, change } from 'Redux/store';
import { useSelector, useDispatch } from 'react-redux';


export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
    JSON.parse(window.localStorage.getItem('contacts')) ||
    [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
      ],
  );

  const contacts2 = useSelector(state => state.contacts2);
  console.log(contacts2);

  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  },[contacts])

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'filter':
        dispatch(change(value));
        break;
    
      default:
        break;
    }
  };

  const onSubmitForm = data => {
    const id = nanoid();
    const contact = {id, ...data};
    dispatch(add(contact));
    const contactLists = [...contacts];
    if (contactLists.findIndex(item => item.name?.toLowerCase() === contact.name?.toLowerCase()) !== -1) {
      return alert(`${contact.name} is already in contacts.`);
    } else {
      contactLists.push(contact);
    }

    setContacts(contactLists);
  };

  const getNewList = () => {
    const newContactList = contacts.filter(contact => {
      return contact.name?.toLowerCase().includes(filter.toLowerCase());
    })
    return newContactList;
  };

  const onDelete = e => {
    dispatch(remove(e));
    setContacts(state => state.filter(contact => contact.id !== e));
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm
      onSubmit={onSubmitForm}
      />
      <h2>Contacts</h2>
      <Filter
      filter={filter} 
      handleChange={handleChange}
      />
      <ContactList
      contacts={getNewList()}
      onDelete={onDelete}
      />
    </div>
  );
}