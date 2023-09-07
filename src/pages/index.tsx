import { useState } from 'react';
import Head from 'next/head';
import AddListForm from '@/components/AddListForm/AddListForm';
import Lists from '@/components/Lists/Lists';
import { IItem, IList } from '@/model';
import styles from '@/styles/Home.module.css';

export default () => {
  const [lists, setLists]: [l: IList[], s: (v: any) => void] = useState([]);

  const addNewList = (listName: String) => {
    setLists((prev: any) => [{
      id: crypto.randomUUID(),
      title: listName,
      expanded: false,
      items: [],
    }, ...prev]);
  };

  const expandList = (listId: String) => {
    setLists((prev: any) => prev.map((list: IList) => 
      ({ ...list, expanded: list.id === listId ? !list.expanded : false })));
  };

  const addNewItemToList = (itemName: String, listId: string) => {
    setLists((prev: any) => prev.map((list: IList) => list.id === listId ? { ...list, items: [{
      id: crypto.randomUUID(),
      title: itemName,
      checked: false,
    }, ...list.items] } : list));
  }

  const completeItem = (itemId: string, listId: string) => {
    setLists((prev: any) => prev.map((list: IList) => list.id === listId ?
      {
        ...list,
        items: list.items.map((item: IItem) => item.id === itemId ? { ...item, checked: !item.checked } : item),
      } : list));
  }

  return (
    <>
      <Head>
        <title>Life-to-List</title>
        <meta name="description" content="Create lists for your life" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <h1 className={`${styles.title}`}>Life-to-List</h1>
        <AddListForm addNewList={addNewList} />
        <Lists
          lists={lists}
          expandList={expandList}
          addNewItemToList={addNewItemToList}
          completeItem={completeItem}
        />
      </main>
    </>
  );
};
