import { useState } from 'react';
import Head from 'next/head';
import AddListForm from '@/components/AddListForm/AddListForm';
import styles from '@/styles/Home.module.css';
import { List } from '@/model';
import Lists from '@/components/Lists/Lists';

export default () => {
  const [lists, setLists]: [l: List[], s: (v: any) => void] = useState([]);

  const addNewList = (listName: String) => {
    setLists((prev: any) => [{
      id: crypto.randomUUID(),
      title: listName,
      expanded: false,
      items: [],
    }, ...prev]);
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
        <Lists lists={lists} />
      </main>
    </>
  );
};
