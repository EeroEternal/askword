import ReactMarkdown from "react-markdown";
import { useEffect, useState, useContext } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Toolbar from "./toolbar";

export default function List({ list, scrollEnd, fileID }) {
  useEffect(() => {
    // scroll view to last record
    if (scrollEnd) {
      const last_index = list.length - 1;
      const last_record = document.getElementById(`list-${last_index}`);

      if (last_record) {
        last_record.scrollIntoView();
      }
    }
  }, [list, scrollEnd]);

  const showToolbar = (state, index) => {
    const toolbar = document.getElementById(`toolbar-${index}`);
    if (toolbar) {
      toolbar.style.visibility = state ? "visible" : "hidden";
    }
  };

  return (
    <div className="pt-12">
      <div className="mb-20 px-3 pt-2">
        {list.map((item, index) => {
          const answer = item.answer;
          const prompt = item.prompt;

          return (
            <div key={index} id={`list-${index}`} className="rounded-lg">
              <div className="break-words px-3 py-3 text-2xl">{prompt}</div>

              <div className="overflow-hidden rounded bg-white px-3">
                <div
                  className="text-gray-600"
                  onMouseEnter={() => showToolbar(true, index)}
                  onMouseLeave={() => showToolbar(false, index)}
                >
                  <ReactMarkdown
                    children={answer}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, "")}
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                          />
                        ) : (
                          <code {...props} className={className}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                  <div id={`toolbar-${index}`} style={{ visibility: "hidden" }}>
                    <Toolbar index={index} list={list} fileID={fileID} />
                  </div>
                </div>
              </div>

              {list.length > 1 && (
                <hr className="ml-2.5 mt-3 border-gray-100" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
