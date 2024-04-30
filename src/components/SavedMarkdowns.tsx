import { HiOutlineTrash } from "react-icons/hi";

type PropsType = {
  markdowns: { title: string; body: string; id: string }[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};
export default function SavedMarkdowns({
  markdowns,
  onSelect,
  onDelete,
}: PropsType) {
  if (!markdowns.length) {
    return <p>No saved markdown found.</p>;
  }
  return (
    <ul className="saved-markdowns">
      {markdowns.map((mark) => (
        <li key={mark.id}>
          <button className="select" onClick={() => onSelect(mark.id)}>
            {mark.title}
          </button>
          <button onClick={() => onDelete(mark.id)} className="delete">
            <HiOutlineTrash />
          </button>
        </li>
      ))}
    </ul>
  );
}
