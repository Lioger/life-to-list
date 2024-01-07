import { useState } from 'react';
import styles from './AddListForm.module.css';

interface AddListFormProps {
  addNewList: (newListTitle: String) => void,
}

const AddListForm = ({ addNewList }: AddListFormProps) => {
  const [listName, setListName] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() || e.target.value === '') {
      setListName(e.target.value);
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!listName.trim()) return;
    addNewList(listName);
    setListName('');
  };

  return (
    <form className={`${styles.form}`} onSubmit={submitForm}>
      <input
        type="text"
        name="New list title"
        placeholder="New list"
        value={listName}
        className={`${styles.input}`}
        onChange={onInputChange}
      />
      <button
        type="submit"
        name="Add new list"
        className={`${styles.submit} ${!!listName ? styles.submitActive : ''}`}
        disabled={!listName}
      >+ Add</button>
    </form>
  );
};

export default AddListForm;
