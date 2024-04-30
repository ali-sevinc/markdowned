import { FormEvent, useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MdPreview } from "react-icons/md";
import { LiaMarkdown } from "react-icons/lia";

import Header from "./components/Header";
import Modal from "./components/Modal";
import SavedMarkdowns from "./components/SavedMarkdowns";
import SaveForm from "./components/SaveForm";

type MarkdownType = { id: string; title: string; body: string };

export default function App() {
  const [markdowned, setMarkdowned] = useState("");
  const [savedMarkdowns, setSavedMarkdowns] = useState<MarkdownType[]>([]);

  const [showSavedMarkdowns, setShowSavedMarkdowns] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);

  useEffect(function () {
    const storedMarkdowns =
      JSON.parse(localStorage.getItem("markdowned")!) || [];
    setSavedMarkdowns(storedMarkdowns);
  }, []);

  function handleShowSavedMarkdowns() {
    setShowSavedMarkdowns(true);
  }
  function handleHideSavedMarkdowns() {
    setShowSavedMarkdowns(false);
  }
  function handleShowSaveForm() {
    setShowSaveForm(true);
  }
  function handleHideSaveForm() {
    setShowSaveForm(false);
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    if (!title || !title?.trim() || !body || !body.trim()) {
      return;
    }
    const newMarkdow = {
      title,
      body,
      id: Math.random().toString(),
    };
    const updatedMarkdowns = [...savedMarkdowns, newMarkdow];
    localStorage.setItem("markdowned", JSON.stringify(updatedMarkdowns));
    setSavedMarkdowns(updatedMarkdowns);
    handleHideSaveForm();
  }

  function handleSelectSavedMarkdown(id: string) {
    const selectedMarkdown = savedMarkdowns.find((mark) => mark.id === id);
    if (!selectedMarkdown) return;
    setMarkdowned(selectedMarkdown.body);
    handleHideSavedMarkdowns();
  }

  function handleDeleteMarkdown(id: string) {
    const updatedMarkdowns = [...savedMarkdowns].filter(
      (mark) => mark.id !== id
    );
    localStorage.setItem("markdowned", JSON.stringify(updatedMarkdowns));
    setSavedMarkdowns(updatedMarkdowns);
  }

  return (
    <>
      <div>
        <Header
          onShowSaved={handleShowSavedMarkdowns}
          onShowSaveForm={handleShowSaveForm}
        />
        <div className="content">
          <div>
            <h2 className="small-header">
              <LiaMarkdown />
            </h2>
            <textarea
              value={markdowned}
              onChange={(e) => setMarkdowned(e.target.value)}
              className="textarea"
            />
          </div>
          <div>
            <h2 className="small-header">
              <MdPreview />
            </h2>
            <Markdown className="markdown" remarkPlugins={[remarkGfm]}>
              {markdowned}
            </Markdown>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showSavedMarkdowns && (
          <Modal onClose={handleHideSavedMarkdowns} open={showSavedMarkdowns}>
            <SavedMarkdowns
              markdowns={savedMarkdowns}
              onSelect={handleSelectSavedMarkdown}
              onDelete={handleDeleteMarkdown}
            />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSaveForm && (
          <Modal open={showSaveForm} onClose={handleHideSaveForm}>
            <SaveForm
              body={markdowned}
              onClose={handleHideSaveForm}
              onSubmit={handleSubmit}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
