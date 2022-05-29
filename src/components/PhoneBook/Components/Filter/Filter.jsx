import style from './Filter.module.scss';
import PropTypes from 'prop-types';

const Filter = ({ handleFilter, filter }) => {
  return (
    <label className={style.label}>
      Filter
      <input
        className={style.input}
        id="#filter"
        type="text"
        onChange={handleFilter}
        value={filter}
      />
    </label>
  );
};
Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};
export default Filter;
