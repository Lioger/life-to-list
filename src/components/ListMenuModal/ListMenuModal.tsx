import { IList } from '@/model';
import { filterOptions, sortOptions } from './constants';
import styles from './ListMenuModal.module.css';

interface ListMenuModalProps {
  deleteList: (listId: string) => void,
  filter: string,
  handleChangeParam: (e: React.MouseEvent<HTMLButtonElement>) => void,
  openedListMenu: IList | null,
  closeListMenu: () => void,
  sort: string,
}

const ListMenuModal = ({
  closeListMenu,
  deleteList,
  filter,
  handleChangeParam,
  openedListMenu,
  sort,
}: ListMenuModalProps) => {
  const handleDeleteList = () => {
    if (openedListMenu) deleteList(openedListMenu.id);
  };

  return (
    <>
      <div className={`${styles.modalUnderlay} ${openedListMenu ? styles.modalUnderlayOpened : ''}`} onClick={closeListMenu} />
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
    </>
  );
};

export default ListMenuModal;
