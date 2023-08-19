export interface IItem {
  id: String,
  title: String,
  checked: Boolean,
};

export interface IList {
  id: String,
  title: String,
  expanded: Boolean,
  items: IItem[],
};
