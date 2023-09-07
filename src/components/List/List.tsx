import { useEffect, useRef, useState } from "react";
import Item from "../Item/Item";
import { IList } from "@/model";
import styles from './List.module.css';

interface ListProps {
  list: IList,
  expandList: (listId: String) => void,
  addNewItemToList: (itemName: String, listId: string) => void,
  completeItem: (itemId: string, listId: string) => void,
}

export default ({ completeItem, list, expandList, addNewItemToList }: ListProps) => {
  const [isAddItemFormActive, setIsAddItemFormActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listBodyRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return;
    addNewItemToList(inputRef.current.value, list.id);
    inputRef.current.value = '';
  };

  useEffect(() => {
    if (!listBodyRef.current) return;
    listBodyRef.current.style.maxHeight = `${list.expanded ? listBodyRef.current.scrollHeight + 16 : 0}px`;
  }, [list.expanded, list.items]);

  useEffect(() => {
    if (isAddItemFormActive && inputRef.current) inputRef.current.focus();
  }, [isAddItemFormActive]);

  return (
    <div className={`${styles.list} ${list.expanded ? styles.listActive : ''}`}>
      <h3 className={`${styles.listHeader}`} onClick={() => expandList(list.id)}>
        {list.title}<span className={`${styles.itemsCount}`}>{list.items.length}</span>
      </h3>
      <div className={`${styles.listBody}`} ref={listBodyRef}>
        <div className={`${styles.listBodyPadding}`}>
          {isAddItemFormActive ? (
            <form className={`${styles.addItemForm}`} onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="New item title"
                placeholder="New item"
                ref={inputRef}
                className={`${styles.addItemFormInput}`}
              />
              <input
                type="submit"
                name="Add new item"
                value=""
                className={`${styles.addItemFormIcon} ${styles.addItemFormIconSubmit}`}
              />
              <input
                type="button"
                name="Close new item form"
                value=""
                className={`${styles.addItemFormIcon} ${styles.addItemFormIconCancel}`}
                onClick={() => setIsAddItemFormActive(false)}
              />
            </form>
          ) : (
            <button className={`${styles.openItemFormButton}`} onClick={() => setIsAddItemFormActive(true)}>
              + List item
            </button>
          )}
          {list.items.length > 0 && (
            <ul className={`${styles.itemsList}`}>
              {list.items.map(item => <Item key={item.id} listId={list.id} item={item} completeItem={completeItem} />)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
