import { IList } from "@/model";
import List from "../List/List";
import styles from './Lists.module.css';

interface ListsProps {
  addNewItemToList: (itemName: String, listId: string) => void,
  completeItem: (itemId: string, listId: string) => void,
  deleteItem: (itemId: string, listId: string) => void,
  expandList: (listId: String) => void,
  lists: IList[],
}

export default ({ addNewItemToList, completeItem, deleteItem, expandList, lists }: ListsProps) => {
  return (
    <section className={`${styles.lists}`}>
      {lists.map(list => (
        <List
          key={list.id}
          addNewItemToList={addNewItemToList}
          completeItem={completeItem}
          deleteItem={deleteItem}
          expandList={expandList}
          list={list}
        />
      ))}
    </section>
  );
};
