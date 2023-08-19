import { useState } from 'react';
import Head from 'next/head';
import AddListForm from '@/components/AddListForm/AddListForm';
import Lists from '@/components/Lists/Lists';
import { IList } from '@/model';
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
      (list.id === listId ? { ...list, expanded: !list.expanded } : list)));
  };

  return (
    <>
      <Head>
        <title>My Lists</title>
        <meta name="description" content="Create lists for your life" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <h1 className={`${styles.title}`}>My Lists</h1>
        <AddListForm addNewList={addNewList} />
        <Lists lists={lists} expandList={expandList} />
      </main>
    </>
  );
};
