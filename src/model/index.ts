export interface Item {
  id: String,
  title: String,
  checked: Boolean,
};

export interface List {
  id: String,
  title: String,
  expanded: Boolean,
  items: Item[],
};
