import PropTypes from 'prop-types';
import { FiTrash2 } from 'react-icons/fi';
import css from './ContactItem.module.css';

export const ContactItem = ({ id, name, number, onDeleteContact }) => (
  <li key={id} className={css.contactItem}>
    <div>
      <span>
        {name}: {number}
      </span>
      <button className={css.btn} onClick={onDeleteContact}>
        <FiTrash2 style={{ color: 'white', paddingRight: 5 }} />
        Delete
      </button>
    </div>
  </li>
);

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func,
};
