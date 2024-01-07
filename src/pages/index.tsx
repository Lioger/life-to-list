import { useEffect, useState } from 'react';
import type { Metadata } from 'next';
import Head from 'next/head';
import AddListForm from '@/components/AddListForm/AddListForm';
import Lists from '@/components/Lists/Lists';
import ListMenuModal from '@/components/ListMenuModal/ListMenuModal';
import { lsGetItem, lsSetItem } from '@/helpers/localStorage';
import { IItem, IList } from '@/model';
import styles from '@/styles/Home.module.css';

export const metadata: Metadata = {
  title: 'Life-to-List',
  description: "Create lists for any life situation you're in.",
  creator: 'Nikita Stepanov',
  publisher: 'Nikita Stepanov',
  metadataBase: new URL('http://life-to-list.vercel.app'),
  openGraph: {
    images: '/app.png',
  },
};

const Main = () => {
  const [lists, setLists]: [l: IList[], s: (v: any) => void] = useState(lsGetItem('lists') || []);
  const [openedListMenu, setOpenedListMenu]: [l: IList | null, s: (v: any) => void] = useState(null);
  const [filter, setFilter] = useState('default');
  const [sort, setSort] = useState('default');

  const addNewList = (listName: String) => {
    setLists((prev: any) => [{
      id: crypto.randomUUID(),
      title: listName,
      expanded: false,
      items: [],
    }, ...prev]);
  };

  const expandList = (listId: string) => {
    setLists((prev: any) => prev.map((list: IList) => 
      ({ ...list, expanded: list.id === listId ? !list.expanded : false })));
  };

  const openListMenu = (listId: string) => {
    const openedList = lists.find(list => list.id === listId);
    if (openedList) setOpenedListMenu(openedList);
  };

  const closeListMenu = () => {
    setOpenedListMenu(null);
  };

  const deleteList = (listId: string) => {
    closeListMenu();
    setLists((prev: any) => prev.filter((list: IList) => list.id !== listId));
  };

  const addNewItemToList = (itemName: String, listId: string) => {
    setLists((prev: any) => prev.map((list: IList) => list.id === listId ? { ...list, items: [{
      id: crypto.randomUUID(),
      title: itemName,
      checked: false,
    }, ...list.items] } : list));
  };

  const completeItem = (itemId: string, listId: string) => {
    setLists((prev: any) => prev.map((list: IList) => list.id === listId ?
      {
        ...list,
        items: list.items.map((item: IItem) => item.id === itemId ? { ...item, checked: !item.checked } : item),
      } : list));
  };

  const deleteItem = (itemId: string, listId: string) => {
    setLists((prev: any) => prev.map((list: IList) => list.id === listId ?
      {
        ...list,
        items: list.items.filter((item: IItem) => item.id !== itemId),
      } : list));
  };

  const handleChangeParam = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLButtonElement && e.target.dataset.value) {
      if (e.target.dataset.type === 'filter') {
        setFilter(e.target.dataset.value);
      } else if (e.target.dataset.type === 'sort') {
        setSort(e.target.dataset.value);
      }
    }
  };

  useEffect(() => {
    lsSetItem('lists', lists);
  }, [lists]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Life-to-List</title>
      </Head>
      <main className={`${styles.main}`}>
        <h1 className={`${styles.title}`}>Life-to-List</h1>
        <AddListForm addNewList={addNewList} />
        <Lists
          addNewItemToList={addNewItemToList}
          completeItem={completeItem}
          deleteItem={deleteItem}
          expandList={expandList}
          filter={filter}
          lists={lists}
          openListMenu={openListMenu}
          sort={sort}
          />
          <ListMenuModal
            deleteList={deleteList}
            filter={filter}
            handleChangeParam={handleChangeParam}
            openedListMenu={openedListMenu}
            closeListMenu={closeListMenu}
            sort={sort}
          />
      </main>
    </>
  );
};

export default Main;
