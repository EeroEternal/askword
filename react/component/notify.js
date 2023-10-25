import { useContext } from 'react';

import { NotifyContext } from '../chat/context.js';

export default function Notify() {
  const { pos, content, isOpen, show, close } = useContext(NotifyContext)

  return (
    <div>
      <div className="relative ">
        {isOpen && (
          <div
            className="absolute bg-white border rounded shadow w-12 h-6"
            style={{ top: pos.top + "px", left: pos.left + "px" }}
          >
            <div className="flex items-center justify-center">
              <p className="text-black text-sm">
                {content}
              </p>
            </div>
          </div>

        )}
      </div>
    </div>
  )
}
