import { useState, useEffect } from 'react';
import '../css/App.css';
import ListContacts from './ListContacts';
import * as ContactsAPI from '../utils/ContactsAPI';
import AddForm from './AddForm';
import { Route, Routes, useNavigate } from 'react-router-dom';
const App = () => {
  const removeContact = (contact) => {
    ContactsAPI.remove(contact);

    setContacts(contacts.filter((c) => c.id !== contact.id));
  };
  let Navigate = useNavigate();

  const CreateContact = (contact) => {
    const Create = async () => {
      const res = await ContactsAPI.create(contact);
      setContacts(contacts.concat(res));
    };

    Create();
    Navigate('/');
  };

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res);
    };
    getContacts();
  }, []);

  return (
    <Routes>
      <Route
        exact
        path='/'
        element={
          <ListContacts contacts={contacts} onDeleteContact={removeContact} />
        }
      />
      <Route
        path='/Create'
        element={
          <AddForm
            onCreateContact={(contact) => {
              CreateContact(contact);
            }}
          />
        }
      />
    </Routes>
  );
};

export default App;
