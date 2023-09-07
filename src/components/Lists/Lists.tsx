import { IList } from "@/model";
import List from "../List/List";
import styles from './Lists.module.css';

interface ListsProps {
  lists: IList[],
  expandList: (listId: String) => void,
  addNewItemToList: (itemName: String, listId: string) => void,
  completeItem: (itemId: string, listId: string) => void,
}

export default ({ completeItem, lists, expandList, addNewItemToList }: ListsProps) => {
  return (
    <section className={`${styles.lists}`}>
      {lists.map(list => (
        <List
          key={list.id}
          list={list}
          expandList={expandList}
          addNewItemToList={addNewItemToList}
          completeItem={completeItem}
        />
      ))}
    </section>
  );
};
