import { IList } from "@/model";
import List from "./components/List/List";
import styles from './Lists.module.css';

interface ListsProps {
  lists: IList[],
  expandList: (listId: String) => void,
}

export default ({ lists, expandList }: ListsProps) => {
  return (
    <section className={`${styles.lists}`}>
      {lists.map(list => <List list={list} expandList={expandList} />)}
    </section>
  );
};
