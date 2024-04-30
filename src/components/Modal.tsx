import { ReactNode, useEffect, useRef } from "react";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";

type PropsType = { children: ReactNode; open: boolean; onClose: () => void };
export default function Modal({ children, open, onClose }: PropsType) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(
    function () {
      if (!ref.current) return;
      if (open) {
        ref.current.showModal();
      } else {
        ref.current.close();
      }
    },
    [open]
  );

  return createPortal(
    <motion.dialog
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="modal"
      onClose={onClose}
      ref={ref}
      style={{ translateX: "-50%" }}
    >
      {children}
      <button className="closebtn" onClick={onClose}>
        <HiOutlineX />
      </button>
    </motion.dialog>,
    document.body
  );
}
