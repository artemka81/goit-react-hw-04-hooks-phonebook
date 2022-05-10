import PropTypes from 'prop-types';
import { ContactItem } from './ContactItem';
export const ContactList = ({ contacts }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <ContactItem key={id} id={id} name={name} number={number} />
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array,
};
