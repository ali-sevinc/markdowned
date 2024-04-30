import { FormEvent } from "react";

type PropsType = {
  onClose: () => void;
  body: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};
export default function SaveForm({ onSubmit, onClose, body }: PropsType) {
  return (
    <form onSubmit={onSubmit} className="save-form">
      <h2>Save Markdown</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" required name="title" />
      </div>
      <div>
        <textarea hidden defaultValue={body} name="body" />
      </div>
      <div className="actions">
        <button onClick={onClose} type="button">
          Cancel
        </button>
        <button>Save</button>
      </div>
    </form>
  );
}
