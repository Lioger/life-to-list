export const lsGetItem = (key: string) => {
  if (typeof window === 'undefined') return null;
  const lists = localStorage.getItem(key);
  if (!lists) return null;
  return JSON.parse(lists);
};

export const lsSetItem = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};
