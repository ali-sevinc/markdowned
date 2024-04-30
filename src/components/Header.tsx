import { CiFloppyDisk, CiBoxList } from "react-icons/ci";
import { LiaMarkdown } from "react-icons/lia";
import { MdPreview } from "react-icons/md";
import { VscMarkdown } from "react-icons/vsc";

type PropsType = { onShowSaved: () => void; onShowSaveForm: () => void };
export default function Header({ onShowSaved, onShowSaveForm }: PropsType) {
  return (
    <header className="header">
      <div className="main-header">
        <h1>
          <span>MarkDowned</span>
          <VscMarkdown />
        </h1>
        <div>
          <button onClick={onShowSaveForm}>
            <CiFloppyDisk />
          </button>
          <button onClick={onShowSaved}>
            <CiBoxList />
          </button>
        </div>
      </div>
      <div className="content-header">
        <h2>
          <LiaMarkdown />
        </h2>
        <h2>
          <MdPreview />
        </h2>
      </div>
    </header>
  );
}

/*
# Markdowned!
## How to Use?
Just markdown and see how it looks?
### Headings
- "#" for h1.
- "##" for h2.
- "###" for h3.
- "####" for h4. 
### Lists
"*" or "-" for lists.
### Codes
`<p>Small Code Blocks </p>`
```
 <div className="content">
      <textarea
        value={markdowned}
        onChange={(e) => setMarkdowned(e.target.value)}
      />
      <Markdown>
        {markdowned}
      </Markdown>
 </div>
```
> quoutes.

*/
