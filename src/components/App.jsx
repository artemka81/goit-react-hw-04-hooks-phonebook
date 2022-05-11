import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './ui/Container';
import { ContactForm } from './ContactForm/';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // Сохраняем контакт пользователя в state
  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      contacts.find(
        contact => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(preState => ({
      contacts: [contact, ...preState.contacts],
    }));
  };

  // Фильтр (поиск) по списку контактов
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  // Удаляем контакт из списка
  deleteContact = contactItemId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== contactItemId
      ),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const jsonContacts = JSON.parse(contacts);
    if (jsonContacts) {
      this.setState({ contacts: jsonContacts });
    }
  }
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLocaleLowerCase();
    const visibleFilterContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />

        <ContactList
          contacts={visibleFilterContacts}
          handleDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
