import PropTypes from 'prop-types';
import css from './Filter.module.css';

export function Filter({ value, onChange }) {
  return (
    <div className={css.filter}>
      <label>
        Find contacts by name
        <input type="text" name="filter" value={value} onChange={onChange} />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
