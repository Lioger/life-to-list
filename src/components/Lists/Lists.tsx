import { IList } from "@/model";
import List from "../List/List";
import styles from './Lists.module.css';

interface ListsProps {
  addNewItemToList: (itemName: String, listId: string) => void,
  completeItem: (itemId: string, listId: string) => void,
  deleteItem: (itemId: string, listId: string) => void,
  expandList: (listId: string) => void,
  filter: string,
  lists: IList[],
  openListMenu: (listId: string) => void,
  sort: string,
}

export default ({
  addNewItemToList,
  completeItem,
  deleteItem,
  expandList,
  filter,
  lists,
  openListMenu,
  sort,
}: ListsProps) => (
  <section className={`${styles.lists}`}>
    {lists.map(list => (
      <List
        key={list.id}
        addNewItemToList={addNewItemToList}
        completeItem={completeItem}
        deleteItem={deleteItem}
        expandList={expandList}
        filter={filter}
        list={list}
        openListMenu={openListMenu}
        sort={sort}
      />
    ))}
  </section>
);
