import style from './ContactsForm.module.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
// class ContactsForm extends Component {
//   static INITIAL_STATE = {
//     name: '',
//     number: '',
//   };

//   state = {
//     name: '',
//     number: '',
//   };

//   handleChange = evt => {
//     const { value, name } = evt.target;
//     this.setState({ [name]: value });
//   };
//   reset = () => {
//     this.setState({ ...ContactsForm.INITIAL_STATE });
//   };

//   render() {
//     return
//   }
// }

const ContactsForm = ({ handleSubmit }) => {
  const [data, setData] = useState({ userName: '', number: '' });

  const handleChange = evt => {
    const { value, name } = evt.target;
    setData({ ...data, [name]: value });
  };
  const reset = () => {
    setData({ userName: '', number: '' });
  };
  return (
    <form
      onSubmit={evt => {
        evt.preventDefault();
        handleSubmit(data.userName, data.number);
        reset();
      }}
    >
      <div className={style.inputDiv}>
        <label className={style.label}>
          Name
          <input
            className={style.input}
            type="text"
            name="userName"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={data.userName}
            onChange={handleChange}
            required
          />
        </label>
        <label className={style.label}>
          Number
          <input
            className={style.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={data.number}
          />
        </label>
      </div>
      <button className={style.submit} type="submit">
        add contact
      </button>
    </form>
  );
};
ContactsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ContactsForm;
