import { List } from "@/model";

interface ListsProps {
  lists: List[],
}

export default ({ lists }: ListsProps) => {
  return (
    <section>
      {lists.map(list => <div>{list.title}</div>)}
    </section>
  );
};
