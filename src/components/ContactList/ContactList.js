import css from '../ContactList/ContactList.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { remove } from 'Redux/store';

export const ContactList = ({ contacts, onDelete }) => {
    const dispatch = useDispatch();
    return (
        <ul className={css.contact__list}>
            {contacts.map((contact, id) => (
                <li key={id} className={css.contact__list__item}>
                    <span>{contact.name} :</span>
                    <span>{contact.number}</span>
                    <button
                    className={css.contact__list__btn} 
                    type='button'
                    onClick={() => dispatch(remove(contact.id))}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  };