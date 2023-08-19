import { IList } from "@/model";
import styles from './List.module.css';

interface ListProps {
  list: IList,
  expandList: (listId: String) => void,
}

export default ({ list, expandList }: ListProps) => {
  return (
    <h3
      className={`${styles.listHeader} ${list.expanded ? styles.listHeaderActive : ''}`}
      onClick={() => expandList(list.id)}
    >
      {list.title}<span className={`${styles.itemsCount}`}>{list.items.length}</span>
    </h3>
  );
};
