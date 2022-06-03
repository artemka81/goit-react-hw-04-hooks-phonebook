import PropTypes from 'prop-types';
import { FiTrash2 } from 'react-icons/fi';
import css from './ContactItem.module.css';

export function ContactItem({ name, number, onDeleteContact }) {
  return (
    <li className={css.contactItem}>
      <span>
        {name}: {number}
      </span>
      <button className={css.btn} onClick={onDeleteContact}>
        <FiTrash2 style={{ color: 'white', paddingRight: 5 }} />
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func,
};
