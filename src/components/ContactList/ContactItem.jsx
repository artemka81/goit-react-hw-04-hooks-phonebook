import PropTypes from 'prop-types';
import css from './ContactItem.module.css';
export const ContactItem = ({ id, name, number, onDeleteContact }) => (
  <li key={id} className={css.contactItem}>
    <div>
      <span>
        {name}: {number}
      </span>
      <button onClick={() => onDeleteContact(id)}>Delete</button>
    </div>
  </li>
);

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func,
};
