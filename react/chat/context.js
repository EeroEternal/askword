import { createContext } from 'react'

export const NotifyContext = createContext({
  pos: { top: 0, left: 0 },
  content: "",
  isOpen: false,
  success: () => { },
  error: () => { },
});
