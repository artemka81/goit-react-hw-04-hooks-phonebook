import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './ui/Container';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

export default function App() {
  // useState забираем из localStorage значения для переменных или создаем пустой массив 'contacts'
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  // useEffect записываем или обновляем массив "contacts" в localStorage при изменении useState "contacts"
  useEffect(() => {
    window.localStorage.getItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Создаем уникальный Id для контакта и делаем проверку
  // на уникальность имени + унакальность номера телефона
  function addContact({ name, number }) {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const normalizeContact = contact.name.toLowerCase();
    if (contacts.find(({ name }) => name.toLowerCase() === normalizeContact)) {
      return alert(`${name} is already in contacts`);
    }
    if (contacts.find(({ number }) => number === contact.number)) {
      return alert(`${number} is already in contacts`);
    }

    setContacts(prevState => [contact, ...prevState]);
  }
  // Фильтр поиск по списку контактов
  const changeFilter = e => {
    const search = e.currentTarget.value;
    setFilter(search);
  };
  // Отображение контактов по фильтру
  const visibleFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Удаляем контакт из списка
  const deleteContact = contactItemId => {
    console.log(contactItemId);
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactItemId)
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={visibleFilterContacts()}
        handleDeleteContact={deleteContact}
      />
    </Container>
  );
}
