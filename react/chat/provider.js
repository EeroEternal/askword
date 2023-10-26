import { NotifyContext } from "./context";
import { useState } from "react";

const NotifyProvider = ({ children }) => {
  //notify
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const show = (pos, title, content) => {
    setPos(pos);
    setContent(content);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setContent("");
    setIsOpen(false);
  };

  return (
    <NotifyContext.Provider value={{ pos, content, isOpen, show, close }}>
      {children}
    </NotifyContext.Provider>
  );
};

export { NotifyProvider };
