import { createContext } from "react";

const NotifyContext = createContext({
  pos: { top: 0, left: 0 },
  content: "",
  isOpen: false,
  success: () => {},
  error: () => {},
});

export { NotifyContext };
