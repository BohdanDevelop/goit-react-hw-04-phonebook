import { Component } from 'react';
import Contacts from './Components/Contacts';
import ContactsForm from './Components/ContactsForm';
import Filter from './Components/Filter';

import { nanoid } from 'nanoid';

class PhoneBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };
  componentDidMount() {
    const savedContacts = JSON.parse(window.localStorage.getItem('contacts'));
    console.log(savedContacts);
    if (savedContacts.length) {
      this.setState({ contacts: [...savedContacts] });
    }
  }
  componentDidUpdate() {
    const { contacts } = this.state;
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  handleFilter = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };

  handleSubmit = (name, number) => {
    const allTheName = this.state.contacts.map(elem => elem.name.toUpperCase());
    if (allTheName.includes(name.toUpperCase())) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(prevState => {
        const newContacts = [
          ...prevState.contacts,
          {
            name,
            number,
            id: `id-${nanoid()}`,
          },
        ];
        return {
          contacts: newContacts,
        };
      });
    }
  };

  onDeleteClick = evt => {
    if (evt.target.type === 'button') {
      const deleteName = evt.target.name.toLowerCase();

      this.setState(prevState => {
        const newContacts = prevState.contacts.filter(
          element => element.name.toLowerCase() !== deleteName
        );

        return {
          contacts: newContacts,
        };
      });
    }
  };
  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(({ name }) =>
      name.toUpperCase().includes(filter.toUpperCase().trim())
    );

    const passedContacts = filter ? filteredContacts : contacts;

    return (
      <>
        <ContactsForm handleSubmit={this.handleSubmit} />
        <Filter filter={filter} handleFilter={this.handleFilter} />

        <Contacts names={passedContacts} onClick={this.onDeleteClick} />
      </>
    );
  }
}

export default PhoneBook;
