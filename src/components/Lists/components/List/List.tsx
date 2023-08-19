import { IList } from "@/model";
import styles from './List.module.css';

interface ListProps {
  list: IList,
  expandList: (listId: String) => void,
}

export default ({ list, expandList }: ListProps) => {
  return (
    <div className={`${styles.list} ${list.expanded ? styles.listActive : ''}`}>
      <h3 className={`${styles.listHeader}`} onClick={() => expandList(list.id)}>
        {list.title}<span className={`${styles.itemsCount}`}>{list.items.length}</span>
      </h3>
      <ul className={`${styles.listBody}`}>
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Doloribus, rem omnis commodi corrupti aspernatur quos, fuga autem ipsum quibusdam incidunt,
          aperiam porro nobis. Facilis ipsam aliquam, reiciendis atque minus eligendi.
        </div>
      </ul>
    </div>
  );
};
