import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const ListContacts = ({ contacts, onDeleteContact }) => {
  const [theText, settheText] = useState('');

  const changeText = (theText) => {
    settheText(theText.trim());
  };

  const ClearText = () => {
    changeText('');
  };

  const showingContacts =
    theText === ''
      ? contacts
      : contacts.filter((c) =>
          c.name.toLowerCase().includes(theText.toLowerCase())
        );
  return (
    <div className='List-contacts'>
      <div className='List-contacts-top'>
        <input
          className='search-contacts'
          type='text'
          placeholder='Contact Search'
          value={theText}
          onChange={(event) => changeText(event.target.value)}
        />
        <Link to={'/create'} className='add-contact'>
          Add Contact
        </Link>
      </div>
      <div>
        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>
              Now Showing {showingContacts.length} out of {contacts.length}{' '}
            </span>
            <button onClick={ClearText}>show all</button>
          </div>
        )}
      </div>

      <ol className='contact-list'>
        {showingContacts.map((contact) => (
          <li key={contact.id} className='contact-list-item'>
            <div
              className='contact-avatar'
              style={{
                backgroundImage: `url(${contact.avatarURL})`,
              }}
            ></div>
            <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.handle}</p>
            </div>
            <button
              className='contact-remove'
              onClick={() => onDeleteContact(contact)}
            >
              remove
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ListContacts;
