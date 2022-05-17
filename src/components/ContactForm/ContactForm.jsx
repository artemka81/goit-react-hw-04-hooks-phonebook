import PropTypes from 'prop-types';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import css from './ContactForm.module.css';

export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };
  // Получаем значение из input и обновляем state
  handleChange = e => {
    const { value, name } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  // Получаем значение из формы и передаем пропсами в App
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.resetForm();
  };
  // Очищаем input формы
  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.contactForm} onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
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
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className={css.btn}>
          <FiPlus style={{ color: 'white', paddingRight: 5 }} />
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
