import PropTypes from 'prop-types';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import css from './ContactForm.module.css';

export function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Получаем значение из input и обновляем useState
  const handleChangeName = e => {
    const value = e.currentTarget.value;
    setName(value);
  };
  const handleChangeNumber = e => {
    const value = e.currentTarget.value;
    setNumber(value);
  };

  // Получаем значение из формы
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    resetForm();
  };
  // Очищаем input формы
  const resetForm = e => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChangeName}
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
          onChange={handleChangeNumber}
        />
      </label>
      <button type="submit" className={css.btn}>
        <FiPlus style={{ color: 'white', paddingRight: 5 }} />
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
