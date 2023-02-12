
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from './Filter/Filter';
import { change } from 'Redux/store';
import { useSelector, useDispatch } from 'react-redux';


export const App = () => {

  const contacts = useSelector(state => state.contacts.items);

  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

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

  const normalizedData = filter.toLowerCase();
  const normalizedContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedData)
  );

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
      <ContactForm />
      <h2>Contacts</h2>
      <Filter
      filter={filter} 
      handleChange={handleChange}
      />
      <ContactList
      contacts={normalizedContacts}
      />
    </div>
  );
}