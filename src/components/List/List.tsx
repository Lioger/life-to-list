import { useEffect, useRef, useState } from "react";
import Item from "../Item/Item";
import { IItem, IList } from "@/model";
import globalComponentsStyles from '@/styles/components.module.css';
import styles from './List.module.css';

interface ListProps {
  addNewItemToList: (itemName: String, listId: string) => void,
  completeItem: (itemId: string, listId: string) => void,
  deleteItem: (itemId: string, listId: string) => void,
  expandList: (listId: string) => void,
  filter: string,
  list: IList,
  openListMenu: (listId: string) => void,
  sort: string,
}

const List = ({
  addNewItemToList,
  completeItem,
  deleteItem,
  expandList,
  filter,
  list,
  openListMenu,
  sort,
}: ListProps) => {
  const [isAddItemFormActive, setIsAddItemFormActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listBodyRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return;
    addNewItemToList(inputRef.current.value, list.id);
    inputRef.current.value = '';
  };

  const handleToggleListMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openListMenu(list.id);
  };

  const prepareItems = (items: IItem[], filter: string, sort: string) => {
    const filteredItems = filter === 'default' ? [...items] : items.filter((item) => {
      if (filter === 'completed') return item.checked;
      if (filter === 'uncompleted') return !item.checked;
    });
    if (sort !== 'default') {
      filteredItems.sort((a, b) => {
        if (sort === 'completed') {
          if (a.checked && !b.checked) {
            return -1;
          } else if (!a.checked && b.checked) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (a.checked && !b.checked) {
            return 1;
          } else if (!a.checked && b.checked) {
            return -1;
          } else {
            return 0;
          }
        }
      });
    }
    return filteredItems;
  };

  useEffect(() => {
    if (!listBodyRef.current) return;
    listBodyRef.current.style.maxHeight = `${list.expanded ? listBodyRef.current.scrollHeight + 16 : 0}px`;
  }, [list.expanded, list.items]);

  useEffect(() => {
    if (isAddItemFormActive && inputRef.current) inputRef.current.focus();
  }, [isAddItemFormActive]);

  const preparedItems = prepareItems(list.items, filter, sort);

  return (
    <div className={`${styles.list} ${list.expanded ? styles.listActive : ''}`}>
      <h3 className={`${styles.listHeader}`} onClick={() => expandList(list.id)}>
        {list.title}<span className={`${styles.itemsCount}`}>{list.items.length}</span>
        <button
          className={`${globalComponentsStyles.iconButton} ${styles.listOpenMenuButton}`}
          onClick={handleToggleListMenu}
          name="Open list menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              fill={`${list.expanded ? 'white' : 'black'}`}
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </button>
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
                className={`${globalComponentsStyles.iconButton} ${styles.addItemFormIconSubmit}`}
              />
              <input
                type="button"
                name="Close new item form"
                value=""
                className={`${globalComponentsStyles.iconButton} ${styles.addItemFormIconCancel}`}
                onClick={() => setIsAddItemFormActive(false)}
              />
            </form>
          ) : (
            <button className={`${styles.openItemFormButton}`} onClick={() => setIsAddItemFormActive(true)}>
              + List item
            </button>
          )}
          {preparedItems.length > 0 && (
            <ul className={`${styles.itemsList}`}>
              {preparedItems.map(item => (
                <Item
                  key={item.id}
                  completeItem={completeItem}
                  deleteItem={deleteItem}
                  item={item}
                  listId={list.id}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
