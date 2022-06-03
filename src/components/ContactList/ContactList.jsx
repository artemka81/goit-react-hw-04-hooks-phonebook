import PropTypes from 'prop-types';
import { ContactItem } from './ContactItem';

export function ContactList({ contacts, handleDeleteContact }) {
  return (
    <ul style={{ padding: 0, marginLeft: 20 }}>
      {contacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDeleteContact={() => handleDeleteContact(id)}
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array,
  handleDeleteContact: PropTypes.func,
};
