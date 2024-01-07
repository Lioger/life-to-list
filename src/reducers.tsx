import {
  CLOSE_LIST_MENU,
  COMPLETE_ITEM,
  CREATE_ITEM_IN_LIST,
  CREATE_LIST,
  DELETE_ITEM,
  DELETE_LIST,
  EXPAND_LIST,
  OPEN_LIST_MENU,
} from "./actions";
import { IAction, IItem, IList } from "./model";

export const listsReducer = (state: IList[], action: IAction) => {
  switch (action.type) {
    case CREATE_LIST:
      return [
        {
          id: crypto.randomUUID(),
          title: action.payload.listName,
          expanded: false,
          items: [],
        },
        ...state,
      ];
    case EXPAND_LIST:
      return state.map((list: IList) => ({
        ...list,
        expanded: list.id === action.payload.listId ? !list.expanded : false,
      }));
    case DELETE_LIST:
      return state.filter((list: IList) => list.id !== action.payload.listId);
    case CREATE_ITEM_IN_LIST:
      return state.map((list: IList) => list.id === action.payload.listId ? { ...list, items: [{
        id: crypto.randomUUID(),
        title: action.payload.itemName,
        checked: false,
      }, ...list.items] } : list);
    case COMPLETE_ITEM:
      return state.map((list: IList) => list.id === action.payload.listId ?
      {
        ...list,
        items: list.items.map((item: IItem) => item.id === action.payload.itemId ? {
          ...item,
          checked: !item.checked,
        } : item),
      } : list);
    case DELETE_ITEM:
      return state.map((list: IList) => list.id === action.payload.listId ?
      {
        ...list,
        items: list.items.filter((item: IItem) => item.id !== action.payload.itemId),
      } : list);
    default:
      return state;
  }
};

export const openedListMenuReducer = (state: IList | null, action: IAction) => {
  switch (action.type) {
    case OPEN_LIST_MENU:
      return action.payload;
    case CLOSE_LIST_MENU:
      return null;
    default:
      return state;
  }
};
