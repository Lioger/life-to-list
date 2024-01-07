import { IItem } from "@/model";
import globalComponentsStyles from '@/styles/components.module.css';
import styles from './Item.module.css';

interface ItemProps {
  completeItem: (itemId: string, listId: string) => void,
  deleteItem: (itemId: string, listId: string) => void,
  item: IItem,
  listId: string,
}

const Item = ({ completeItem, deleteItem, item, listId }: ItemProps) => {
  const handleCheck = () => {
    completeItem(item.id, listId);
  };

  const handleDelete = () => {
    deleteItem(item.id, listId);
  };

  return (
    <li className={`${styles.item}`}>
      <label
        className={`${styles.itemFakeCheckbox} ${item.checked ? styles.itemFakeCheckboxChecked : ''}`}
        htmlFor={`checkbox-${item.id}`}
      >
        <img className={`${styles.checkmark}`} src="/icons/white-check.svg" alt="Checkmark" />
      </label>
      <input
        className={`${styles.itemCheckbox}`}
        id={`checkbox-${item.id}`}
        type="checkbox"
        name="Item is done"
        onChange={handleCheck}
        checked={item.checked}
      />
      <label className={`${styles.itemTitle}`} htmlFor={`checkbox-${item.id}`}>
        {item.title}
        <span className={`${styles.itemTitleCrossLine} ${item.checked ? styles.itemTitleCrossLineVisible : ''}`} />
      </label>
      <button
        name="Delete item"
        className={`${globalComponentsStyles.iconButton} ${styles.deleteItemButton}`}
        onClick={handleDelete}
      />
    </li>
  );
};

export default Item;
