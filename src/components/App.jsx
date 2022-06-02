import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './ui/Container';
// import { ContactForm } from './ContactForm/';
// import { Filter } from './Filter';
// import { ContactList } from './ContactList';

const dataJson = [
  { name: 'Cabbage', number: 333, id: 1 },
  { name: 'Garlic', number: 222, id: 2 },
  { name: 'Apple', number: 111, id: 3 },
];

const ContactList = ({ contacts }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          name={contact.name}
          number={contact.number}
        />
      ))}
    </ul>
  );
};

const ContactItem = ({ name, number }) => {
  return (
    <li>
      {name}: {number}
    </li>
  );
};

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // Получаем значение из input и обновляем useState
  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  // Получаем значение из формы
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    resetForm();
  };

  // Очищаем input формы
  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>

      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1, 4}?[-.\s]?\(?\d{1, 3}?\)?[-.\s]?\d{1, 4}[-.\s]?\d{1, 4}[-.\s]?\d{1, 9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button type="submit">
        {/* <FiPlus style={{ color: 'white', paddingRight: 5 }} /> */}
        Add contact
      </button>
    </form>
  );
};

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <label>
        Find contacts by name
        <input type="text" value={value} onChange={onChange} />
      </label>
    </div>
  );
};

export default function App() {
  // useState
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? dataJson;
  });
  const [filter, setFilter] = useState('');

  // Создаем уникальный Id для контакта и делаем проверку
  // на уникальность имени + унакальность номера телефона
  const addContact = ({ name, number }) => {
    console.log(name);
    console.log(number);
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    console.log(contact);
    const normalizeContact = contact.name.toLowerCase();

    if (contacts.find(({ name }) => name.toLowerCase() === normalizeContact)) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (contacts.find(({ number }) => number === contact.number)) {
      alert(`${number} is already in contacts`);
      return;
    }

    setContacts(prevState => [contact, ...prevState]);
  };
  // Фильтр (поиск) по списку контактов
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  // Отображение контактов по фильтру
  const visibleFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <ContactForm onSubmit={addContact} />
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleFilterContacts()} />
    </Container>
  );
}

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   // Сохраняем контакт пользователя в state
//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;

//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     if (
//       contacts.find(
//         contact => name.toLowerCase() === contact.name.toLowerCase()
//       )
//     ) {
//       alert(`${name} is already in contacts`);
//       return;
//     }
//     this.setState(preState => ({
//       contacts: [contact, ...preState.contacts],
//     }));
//   };

//   // Фильтр (поиск) по списку контактов
//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   // Удаляем контакт из списка
//   deleteContact = contactItemId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(
//         contact => contact.id !== contactItemId
//       ),
//     }));
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const jsonContacts = JSON.parse(contacts);
//     if (jsonContacts) {
//       this.setState({ contacts: jsonContacts });
//     }
//   }
//   componentDidUpdate(prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const { contacts, filter } = this.state;
//     const normalizeFilter = filter.toLocaleLowerCase();
//     const visibleFilterContacts = contacts.filter(contact =>
//       contact.name.toLocaleLowerCase().includes(normalizeFilter)
//     );

//     return (
//       <Container>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} />

//         <h2>Contacts</h2>
//         <Filter value={filter} onChange={this.changeFilter} />

//         <ContactList
//           contacts={visibleFilterContacts}
//           handleDeleteContact={this.deleteContact}
//         />
//       </Container>
//     );
//   }
// }
