import { IList } from '@/model';
import styles from './ListMenuModal.module.css';

interface ListMenuModalProps {
  deleteList: (listId: string) => void,
  filter: string,
  handleChangeParam: (e: React.MouseEvent<HTMLButtonElement>) => void,
  openedListMenu: IList | null,
  sort: string,
}

const filterOptions = [
  {
    name: 'Filter: show all',
    title: 'Show All',
    value: 'default',
  },
  {
    name: 'Filter: show completed',
    title: 'Show Completed',
    value: 'completed',
  },
  {
    name: 'Filter: show uncompleted',
    title: 'Show Uncompleted',
    value: 'uncompleted',
  },
];
const sortOptions = [
  {
    name: 'Sort: by time added',
    title: 'Time Added',
    value: 'default',
  },
  {
    name: 'Sort: uncompleted first',
    title: 'Uncompleted First',
    value: 'uncompleted',
  },
  {
    name: 'Sort: completed first',
    title: 'Completed First',
    value: 'completed',
  },
];

export default ({ deleteList, filter, handleChangeParam, openedListMenu, sort }: ListMenuModalProps) => {
  const handleDeleteList = () => {
    if (openedListMenu) deleteList(openedListMenu.id);
  };

  return (
    <div className={`${styles.listMenu} ${openedListMenu ? styles.listMenuOpened : ''}`}>
      <div>
        <h3 className={`${styles.listMenuTitle}`}>{openedListMenu?.title} Menu</h3>
        <h4 className={`${styles.listMenuGroupTitle}`}>Filtering</h4>
        <div className={`${styles.listMenuOptionsGroup}`}>
          {filterOptions.map(filterOp => (
            <button
              key={filterOp.value}
              className={`${styles.listMenuButton} ${styles.listMenuButtonOptions} ${filter === filterOp.value ?
                styles.listMenuButtonOptionsActive : ''}`}
              name={filterOp.name}
              data-type="filter"
              data-value={filterOp.value}
              onClick={handleChangeParam}
            >
              {filterOp.title}
            </button>
          ))}
        </div>
      </div>
      <h4 className={`${styles.listMenuGroupTitle}`}>Sorting</h4>
      <div className={`${styles.listMenuOptionsGroup}`}>
        {sortOptions.map(sortOp => (
          <button
            key={sortOp.value}
            className={`${styles.listMenuButton} ${styles.listMenuButtonOptions} ${sort === sortOp.value ?
              styles.listMenuButtonOptionsActive : ''}`}
            name={sortOp.name}
            data-type="sort"
            data-value={sortOp.value}
            onClick={handleChangeParam}
          >
            {sortOp.title}
          </button>
        ))}
      </div>
      <button
        className={`${styles.listMenuButton} ${styles.listMenuButtonRemove}`}
        name="Delete list"
        onClick={handleDeleteList}
      >
        Delete List
      </button>
    </div>
  );
};