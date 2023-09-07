export interface IItem {
  id: string,
  title: String,
  checked: boolean,
};

export interface IList {
  id: string,
  title: String,
  expanded: Boolean,
  items: IItem[],
};
