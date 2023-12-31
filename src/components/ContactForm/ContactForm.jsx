import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import './ContactForm.scss';
import 'react-toastify/dist/ReactToastify.css';

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    const number = e.target.number.value;

    const isDuplicate = checkDuplicateContact(name);

    if (isDuplicate) {
      return toast.error(`${name} is already in contacts.`);
    }
    try {
      await dispatch(addContact({ name, number }));
      e.target.reset();
    } catch (error) {
      return toast.error(`Something go wrong :(`);
    }
  };

  const checkDuplicateContact = name => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    return !!existingContact;
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">
        Name
        <input
          className="input"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className="label">
        Number
        <input
          className="input"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className="button" type="submit">
        Add contact
      </button>
      <ToastContainer autoClose={2000} />
    </form>
  );
}
