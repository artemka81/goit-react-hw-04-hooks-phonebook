import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './ui/Container';
export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };
  // Получаем значение из input и обновляем state
  handleChange = e => {
    const { value, name } = e.currentTarget;
    console.log(value, name);
    this.setState({
      [name]: value,
    });
  };

  // Сохраняем и выводим Имя пользователя
  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(preState => ({
      contacts: [contact, ...preState.contacts],
    }));
  };

  // Получаем значение из формы
  handleSubmit = e => {
    e.preventDefault();
    this.addContact(this.state);
    this.resetForm();
  };
  // Очищаем input формы
  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const contacts = this.state.contacts;
    return (
      <Container>
        <h2>Phonebook</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={this.state.number}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Add contact</button>
        </form>

        <h2>Contacts</h2>
        <ul></ul>
        {contacts.map(({ id, name, number }) => (
          <li key={id}>
            {name}: {number}
          </li>
        ))}
      </Container>
    );
  }
}
