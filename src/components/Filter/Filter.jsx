import PropTypes from 'prop-types';
import css from './Filter.module.css';
export const Filter = ({ value, onChange }) => (
  <div className={css.filter}>
    <label>
      Find contacts by name
      <input type="text" value={value} onChange={onChange} />
    </label>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
