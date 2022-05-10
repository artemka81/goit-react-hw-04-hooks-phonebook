import PropTypes from 'prop-types';
import css from './ContactItem.module.css';
export const ContactItem = ({ id, name, number }) => (
  <li key={id} className={css.contactItem}>
    <span>
      {name}: {number}
    </span>
  </li>
);

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
