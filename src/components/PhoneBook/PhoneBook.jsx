import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Contacts from './Components/Contacts';
import ContactsForm from './Components/ContactsForm';
import Filter from './Components/Filter';

import { nanoid } from 'nanoid';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const PhoneBook = () => {
  const [contacts, setContacts] = useState(defaultContacts);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);
  const handleSubmit = (name, number) => {
    const allTheName = contacts.map(elem => elem.name.toUpperCase());
    if (allTheName.includes(name.toUpperCase())) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(() => {
        const newContact = {
          name,
          number,
          id: `id-${nanoid()}`,
        };
        return [...contacts, newContact];
      });
    }
  };
  const onDeleteClick = useCallback(
    evt => {
      if (evt.target.type === 'button') {
        const deleteName = evt.target.name.toLowerCase();
        setContacts(() => {
          const newContacts = contacts.filter(
            element => element.name.toLowerCase() !== deleteName
          );
          return newContacts;
        });
      }
    },
    [contacts]
  );
  const handleFilter = evt => {
    const { value } = evt.target;
    setFilter(value);
  };
  const filteredContacts = useMemo(() => {
    return () => {
      const newContacts = contacts.filter(({ name }) =>
        name.toUpperCase().includes(filter.toUpperCase().trim())
      );
      return <Contacts names={newContacts} onClick={onDeleteClick} />;
    };
  }, [filter, contacts, onDeleteClick]);
  useEffect(() => {
    const savedContacts = JSON.parse(window.localStorage.getItem('contacts'));
    if (savedContacts?.length) {
      setContacts([...savedContacts]);
    }
  }, []);
  useEffect(() => {
    if (!isFirstRender.current) {
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    isFirstRender.current = false;
  }, [contacts]);
  return (
    <>
      <ContactsForm handleSubmit={handleSubmit} />
      <Filter filter={filter} handleFilter={handleFilter} />
      {filteredContacts()}
    </>
  );
};
export default PhoneBook;
