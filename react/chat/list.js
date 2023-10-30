import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
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
      if (state) {
        toolbar.style.visibility = "visible";
      } else {
        setTimeout(() => {
          toolbar.style.visibility = "hidden";
        }, 100);
      }
    }
  };

  return (
    <div className="pt-12">
      <div className="mx-auto max-w-3xl">
        {list.map((item, index) => {
          const answer = item.answer;
          const prompt = item.prompt;

          return (
            <div key={index} id={`list-${index}`} className="rounded-lg">
              <div className="my-2 break-words rounded-br-2xl bg-zinc-100 px-1 py-2 text-base">
                {prompt}
              </div>

              <div className="overflow-hidden rounded bg-white px-1 text-base leading-7">
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
                  <div
                    id={`toolbar-${index}`}
                    style={{ visibility: "hidden" }}
                    onMouseEnter={() => showToolbar(true, index)}
                  >
                    <Toolbar index={index} list={list} fileID={fileID} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* add some margin */}
      <div className="h-12"></div>
    </div>
  );
}
